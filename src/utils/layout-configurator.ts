import type { Core } from '@strapi/strapi';
import { layoutConfigs, type LayoutConfig } from '../../config/layouts';

/**
 * content-managerのレイアウト設定を適用
 */
export async function applyLayoutConfigurations(strapi: Core.Strapi) {
  for (const config of layoutConfigs) {
    await applyLayoutConfig(strapi, config);
  }
}

async function applyLayoutConfig(strapi: Core.Strapi, config: LayoutConfig) {
  try {
    const contentTypeService = strapi.plugin('content-manager').service('content-types');
    
    // 現在の設定を取得
    const configuration = await contentTypeService.findConfiguration({ uid: config.uid });
    
    if (!configuration?.layouts?.edit) {
      strapi.log.debug(`Layout configuration not found for ${config.uid}, skipping`);
      return;
    }
    
    // 現在のeditレイアウトを取得
    const currentLayout = configuration.layouts.edit;
    
    // フィールド名からインデックスへのマップを作成
    const fieldIndexMap = new Map<string, number>();
    currentLayout.forEach((row: any[], rowIndex: number) => {
      row.forEach((field: any) => {
        if (field.name) {
          fieldIndexMap.set(field.name, rowIndex);
        }
      });
    });
    
    // 指定された順序に並び替え
    const newLayout: any[] = [];
    const usedIndices = new Set<number>();
    
    for (const fieldName of config.fieldOrder) {
      const index = fieldIndexMap.get(fieldName);
      if (index !== undefined && !usedIndices.has(index)) {
        newLayout.push(currentLayout[index]);
        usedIndices.add(index);
      }
    }
    
    // 設定に含まれていないフィールドを末尾に追加
    currentLayout.forEach((row: any[], index: number) => {
      if (!usedIndices.has(index)) {
        newLayout.push(row);
      }
    });
    
    // 設定を更新
    await contentTypeService.updateConfiguration({ uid: config.uid }, {
      ...configuration,
      layouts: {
        ...configuration.layouts,
        edit: newLayout,
      },
    });
    
    strapi.log.info(`Layout configuration applied for ${config.uid}`);
  } catch (error: any) {
    strapi.log.warn(`Failed to apply layout for ${config.uid}:`, error.message);
  }
}
