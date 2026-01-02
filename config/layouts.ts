/**
 * 管理画面のフィールドレイアウト設定
 * 各content-typeのedit viewでのフィールド順序を定義
 */

export interface LayoutConfig {
  uid: string;                    // content-type UID (例: 'api::blog.blog')
  fieldOrder: string[];           // フィールドの表示順序
}

/**
 * レイアウト設定の定義
 * 新しいcontent-typeを追加する場合はここに追加
 */
export const layoutConfigs: LayoutConfig[] = [
  {
    uid: 'api::blog.blog',
    fieldOrder: [
      'title',
      'slug',
      'description',
      'thumbnail',
      'detailImage',
      'tags',      // contentの上
      'content',
    ],
  },
  // 将来的に他のcontent-typeを追加する場合はここに追加
];
