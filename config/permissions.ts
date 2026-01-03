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
 * 
 * 注意: APIをprivate化するため、publicロールのパーミッションは削除しました。
 * API Token認証が必要になります。
 */
export const permissionConfigs: PermissionConfig[] = [
  // publicロールのパーミッションを削除（API Token認証を使用）
  // {
  //   contentType: 'api::work.work',
  //   actions: ['find', 'findOne'],
  //   role: 'public',
  // },
  // {
  //   contentType: 'api::blog.blog',
  //   actions: ['find', 'findOne'],
  //   role: 'public',
  // },
  // {
  //   contentType: 'api::blog-tag.blog-tag',
  //   actions: ['find', 'findOne'],
  //   role: 'public',
  // },
  // 将来的に他のコンテンツタイプを追加する場合はここに追加
];
