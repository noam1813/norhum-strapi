/**
 * パーミッション設定の定義
 * 各コンテンツタイプとロールのパーミッションを定義します
 */

export interface PermissionConfig {
  contentType: string;
  actions: string[];
  role: 'public' | 'authenticated';
}

/**
 * 自動設定するパーミッションの定義
 */
export const permissionConfigs: PermissionConfig[] = [
  {
    contentType: 'api::work.work',
    actions: ['find', 'findOne'],
    role: 'public',
  },
  {
    contentType: 'api::blog.blog',
    actions: ['find', 'findOne'],
    role: 'public',
  },
  {
    contentType: 'api::blog-tag.blog-tag',
    actions: ['find', 'findOne'],
    role: 'public',
  },
  // 将来的に他のコンテンツタイプを追加する場合はここに追加
];
