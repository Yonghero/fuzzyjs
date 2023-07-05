import type { ExtraProps } from './options';
interface HandlerParams {
    data: any;
    url?: string;
    preventDefault?: any;
}
export interface FuzzyNextHandlers {
    /**
     * 查询前
     */
    queryBefore?: (params: HandlerParams) => Promise<any>;
    /**
     * 查询点击下拉框事件
     */
    querySelectChange?: ({ value, model }: any) => any;
    /**
     * 点击更新对话框出来前
     */
    createBeforePop?: (params: HandlerParams) => Promise<any>;
    /**
     * 点击编辑对话框出来前
     */
    updateBeforePop?: (params: HandlerParams) => Promise<any>;
    /**
     * 删除前
     * @Returns 如果传递了url和params 删除会调用传递的url和params作为body参数 如果没传url系统默认设置url 返回值直接当作删除接口的body参数
     */
    deleteBefore?: (params: HandlerParams) => Promise<any>;
    /**
     * 确认更新时
     */
    createConfirm?: (params: HandlerParams) => Promise<ExtraProps>;
    /**
     * 新增更新点击确定按钮时
     * 返回true 关闭弹窗 刷新数据
     */
    updateConfirm?: (params: HandlerParams) => Promise<ExtraProps>;
    /**
     * 取消更新时
     */
    createCancel?: (params: HandlerParams) => any;
    /**
     * 取消编辑时
     */
    updateCancel?: (params: HandlerParams) => any;
    /**
     * 如果表格开启了多选框模式
     * 该事件可以接收多选的参数
     * @param params
     */
    selectionChange?: (params: any[]) => any;
    /**
     * 更新成功后
     */
    updated?: () => any;
    /**
     * tab change
     */
    tabChange?: () => any;
}
export interface PrivateHandlers {
    triggerConfirm: (params: HandlerParams, type: any) => Promise<boolean>;
    listenConfirm: () => Promise<boolean>;
}
export {};
