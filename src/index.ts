import type { Core } from '@strapi/strapi';
import { permissionConfigs } from '../config/permissions';
import { applyLayoutConfigurations } from './utils/layout-configurator';

/**
 * パーミッションを自動設定する関数
 */
async function setupPermissions(strapi: Core.Strapi) {
  try {
    // permissionConfigsに基づいてパーミッションを設定
    for (const config of permissionConfigs) {
      const role = await strapi
        .query('plugin::users-permissions.role')
        .findOne({ where: { type: config.role } });

      if (!role) {
        strapi.log.warn(`Role "${config.role}" not found, skipping permission setup`);
        continue;
      }

      // 既存のパーミッションを取得
      const existingPermissions = await strapi
        .query('plugin::users-permissions.permission')
        .findMany({
          where: {
            role: role.id,
            action: {
              $contains: config.contentType,
            },
          },
        });

      // 各アクションに対してパーミッションを設定
      for (const action of config.actions) {
        const actionName = `${config.contentType}.${action}`;
        
        // 既存のパーミッションを確認
        const existingPermission = existingPermissions.find(
          (p) => p.action === actionName
        );

        if (existingPermission) {
          // 既存のパーミッションを有効化
          if (!existingPermission.enabled) {
            await strapi
              .query('plugin::users-permissions.permission')
              .update({
                where: { id: existingPermission.id },
                data: { enabled: true },
              });
            strapi.log.info(`Enabled permission: ${actionName} for role ${config.role}`);
          }
        } else {
          // 新しいパーミッションを作成
          try {
            await strapi
              .query('plugin::users-permissions.permission')
              .create({
                data: {
                  action: actionName,
                  role: role.id,
                  enabled: true,
                },
              });
            strapi.log.info(`Created permission: ${actionName} for role ${config.role}`);
          } catch (createError: any) {
            // パーミッションが既に存在する場合は無視
            if (createError.message?.includes('unique') || createError.code === '23505') {
              strapi.log.debug(`Permission ${actionName} already exists, skipping`);
            } else {
              throw createError;
            }
          }
        }
      }
    }

    // publicロールの既存パーミッションを無効化（API private化のため）
    await disablePublicPermissions(strapi);

    strapi.log.info('Permissions auto-configuration completed');
  } catch (error: any) {
    strapi.log.error('Failed to auto-configure permissions:', error);
    strapi.log.warn('Please configure permissions manually in the admin panel');
  }
}

/**
 * publicロールの既存パーミッションを無効化する関数
 * API private化のため、publicロールでのアクセスを拒否します
 */
async function disablePublicPermissions(strapi: Core.Strapi) {
  try {
    const publicRole = await strapi
      .query('plugin::users-permissions.role')
      .findOne({ where: { type: 'public' } });

    if (!publicRole) {
      strapi.log.warn('Public role not found, skipping public permission disable');
      return;
    }

    // work, blog, blog-tagのpublicパーミッションを無効化
    const contentTypesToDisable = [
      'api::work.work',
      'api::blog.blog',
      'api::blog-tag.blog-tag',
    ];

    const actionsToDisable = ['find', 'findOne'];

    for (const contentType of contentTypesToDisable) {
      for (const action of actionsToDisable) {
        const actionName = `${contentType}.${action}`;
        
        const existingPermission = await strapi
          .query('plugin::users-permissions.permission')
          .findOne({
            where: {
              role: publicRole.id,
              action: actionName,
            },
          });

        if (existingPermission && existingPermission.enabled) {
          await strapi
            .query('plugin::users-permissions.permission')
            .update({
              where: { id: existingPermission.id },
              data: { enabled: false },
            });
          strapi.log.info(`Disabled public permission: ${actionName}`);
        }
      }
    }

    strapi.log.info('Public permissions disabled for API private mode');
  } catch (error: any) {
    strapi.log.error('Failed to disable public permissions:', error);
    // エラーが発生しても続行（手動で設定可能）
  }
}

export default {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/* { strapi }: { strapi: Core.Strapi } */) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  async bootstrap({ strapi }: { strapi: Core.Strapi }) {
    // パーミッションの自動設定を実行
    await setupPermissions(strapi);
    // レイアウト設定を適用
    await applyLayoutConfigurations(strapi);
  },
};
