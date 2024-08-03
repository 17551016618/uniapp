<template>
  <view class="uhf-demo">
    <!-- 搜索蓝牙和连接/断开蓝牙 -->
    <view class="operate">
      <button
        class="btn connect"
        :type="currentDeviceStatus == 1 ? 'warn' : 'primary'"
        @tap="onOpenHistoryDialog"
      >
        <text v-if="currentDeviceStatus == 1">断开</text>
        <text v-else>连接</text>
      </button>
      <button class="btn" type="default" @tap="onOpenDiscoveryDialog">
        搜索
      </button>
    </view>
    <!-- 蓝牙名称和状态 -->
    <view class="ble-info">
      <view class="desc">{{ getCurrentDeviceInfo }}</view>
      <view class="desc">{{ getCurrentDeviceConnectStatus }}</view>
    </view>
    <!-- tab1-7 -->
    <my-tab :currentTabId="currentTabId" @change="onTabChange"></my-tab>
    <!-- tab1********************************************** -->
    <view class="tab1" v-show="currentTabId === 0">
      <checkbox-group @change="checkboxChangeHandlerTab1" class="cg">
        <label>
          过滤
          <checkbox
            value="enableFilter"
            :checked="inventoryLabelForm.filter.enabled"
          />
        </label>
        <label>
          启用RSSI（循环盘点必须）
          <checkbox
            value="enableRssi"
            :checked="inventoryLabelForm.enableRssi"
          />
        </label>
      </checkbox-group>
      <!-- 当过滤启用选中时展示 -->
      <view class="filter-card" v-show="inventoryLabelForm.filter.enabled">
        <label class="my-label">
          地址：
          <input class="ipt" v-model="inventoryLabelForm.filter.address" />(bit)
        </label>
        <label class="my-label">
          长度：
          <input class="ipt" v-model="inventoryLabelForm.filter.length" />(bit)
        </label>
        <label class="my-label">
          数据内容：
          <input
            class="ipt"
            placeholder="请输入16进制字符串"
            v-model="inventoryLabelForm.filter.data"
          />
        </label>
        <!-- 类型按钮 -->
        <view class="btn-warp">
          <button
            class="btn"
            size="mini"
            @tap="inventoryLabelForm.filter.type = 1"
            :class="{ 'is-active': inventoryLabelForm.filter.type == 1 }"
          >
            EPC
          </button>
          <button
            class="btn"
            size="mini"
            @tap="inventoryLabelForm.filter.type = 2"
            :class="{ 'is-active': inventoryLabelForm.filter.type == 2 }"
          >
            TID
          </button>
          <button
            class="btn"
            size="mini"
            @tap="inventoryLabelForm.filter.type = 3"
            :class="{ 'is-active': inventoryLabelForm.filter.type == 3 }"
          >
            USER
          </button>
        </view>
        <!-- 提示 -->
        <view class="tip">
          <button class="btn" size="mini" @tap="onSetLoopInventoryFilter">
            设置
          </button>
          <text>此功能仅对R2000模块有效</text>
        </view>
      </view>
      <!-- 盘点的数据 -->
      <view class="table">
        <!-- 表头行 -->
        <view class="tr">
          <view class="th">{{ inventoryLabelForm.labelCount }}</view>
          <view class="th">{{ inventoryLabelForm.inventoryCount }}</view>
          <view class="th">{{ inventoryLabelForm.costTime }}</view>
          <view class="th">数量</view>
          <view class="th">RSSI</view>
        </view>
        <!-- 表格数据行 -->
        <view
          class="tr"
          v-for="(value, epc) in inventoryLabelForm.resultList"
          :key="epc"
        >
          <view class="td colspan3">{{ epc }}</view>
          <view class="td">{{ value.count }}</view>
          <view class="td">{{ value.rssi }}</view>
        </view>
      </view>
      <!-- 底部操作栏 -->
      <view class="inventory-btn">
        <button
          class="btn"
          size="mini"
          :disabled="!isDeviceConnected || inventoryLabelForm.looping"
          @tap="onOneStepInventory"
        >
          单步
        </button>
        <button
          class="btn"
          size="mini"
          :disabled="!isDeviceConnected || inventoryLabelForm.looping"
          @tap="onLoopInventory"
        >
          循环
        </button>
        <button class="btn" size="mini" @tap="onStopInventory">停止</button>
        <button
          class="btn"
          style="margin: 0"
          size="mini"
          @tap="onClearInventoryResult"
        >
          清空数据
        </button>
      </view>
    </view>
    <!-- tab2********************************************** -->
    <view class="tab2" v-show="currentTabId === 1">
      <scroll-view
        scroll-x="true"
        :show-scrollbar="false"
        scroll-left="0"
        :scroll-with-animation="true"
      >
        <view v-html="scanQRForm.data"></view>
      </scroll-view>
      <view class="select-warp"
        >选择编码格式：<uni-data-select
          class="uds"
          v-model="scanQRForm.charset"
          :clear="false"
          :localdata="scanQRForm.charsetList"
        ></uni-data-select
      ></view>

      <!-- 底部操作栏 -->
      <view class="scan-btn">
        <button class="btn" size="mini" @tap="onQRCodeScan">扫描</button>
        <button
          class="btn"
          style="margin: 0"
          size="mini"
          @tap="onClearQRCodeScanResult"
        >
          清除
        </button>
      </view>
    </view>
    <!-- tab3********************************************** -->
    <view class="tab3" v-show="currentTabId === 2">
      <checkbox-group @change="checkboxChangeHandlerTab3" class="cg">
        <label class="my-label">
          启用过滤：
          <checkbox
            value="enableFilter"
            :checked="readLabelForm.filter.enabled"
          />
        </label>
      </checkbox-group>
      <!-- 当过滤启用选中时展示 -->
      <view class="filter-card">
        <label class="my-label">
          地址：
          <input class="ipt" v-model="readLabelForm.filter.address" />(bit)
        </label>
        <label class="my-label">
          长度：
          <input class="ipt" v-model="readLabelForm.filter.length" />(bit)
        </label>
        <label class="my-label">
          数据内容：
          <input
            class="ipt"
            placeholder="请输入16进制字符串"
            v-model="readLabelForm.filter.data"
          />
        </label>
        <!-- 类型按钮 -->
        <view class="btn-warp">
          <button
            class="btn"
            size="mini"
            @tap="readLabelForm.filter.type = 1"
            :class="{ 'is-active': readLabelForm.filter.type == 1 }"
          >
            EPC
          </button>
          <button
            class="btn"
            size="mini"
            @tap="readLabelForm.filter.type = 2"
            :class="{ 'is-active': readLabelForm.filter.type == 2 }"
          >
            TID
          </button>
          <button
            class="btn"
            size="mini"
            @tap="readLabelForm.filter.type = 3"
            :class="{ 'is-active': readLabelForm.filter.type == 3 }"
          >
            USER
          </button>
        </view>
        <view class="select-warp"
          >选择存储区：<uni-data-select
            class="uds"
            v-model="readLabelForm.selectStore"
            :clear="false"
            :localdata="readLabelForm.storeList"
          ></uni-data-select
        ></view>
        <label class="my-label">
          地址：
          <input class="ipt" v-model="readLabelForm.address" />(word)
        </label>
        <label class="my-label">
          长度：
          <input class="ipt" v-model="readLabelForm.length" />(word)
        </label>
        <label class="my-label">
          访问密码：
          <input class="ipt" v-model="readLabelForm.password" />
        </label>
        <label class="my-label">
          数据内容：
          <input class="ipt" v-model="readLabelForm.data" />
        </label>
        <button class="tab-footer-btn" type="primary" @tap="onReadLabel">
          读取数据
        </button>
      </view>
    </view>
    <!-- tab4********************************************** -->
    <view class="tab4" v-show="currentTabId === 3">
      <checkbox-group @change="checkboxChangeHandlerTab4" class="cg">
        <label class="my-label">
          启用过滤：
          <checkbox
            value="enableFilter"
            :checked="writeLabelForm.filter.enabled"
          />
        </label>
      </checkbox-group>
      <!-- 当过滤启用选中时展示 -->
      <view class="filter-card">
        <label class="my-label">
          地址：
          <input class="ipt" v-model="writeLabelForm.filter.address" />(bit)
        </label>
        <label class="my-label">
          长度：
          <input class="ipt" v-model="writeLabelForm.filter.length" />(bit)
        </label>
        <label class="my-label">
          数据内容：
          <input
            class="ipt"
            placeholder="请输入16进制字符串"
            v-model="writeLabelForm.filter.data"
          />
        </label>
        <!-- 类型按钮 -->
        <view class="btn-warp">
          <button
            class="btn"
            size="mini"
            @tap="writeLabelForm.filter.type = 1"
            :class="{ 'is-active': writeLabelForm.filter.type == 1 }"
          >
            EPC
          </button>
          <button
            class="btn"
            size="mini"
            @tap="writeLabelForm.filter.type = 2"
            :class="{ 'is-active': writeLabelForm.filter.type == 2 }"
          >
            TID
          </button>
          <button
            class="btn"
            size="mini"
            @tap="writeLabelForm.filter.type = 3"
            :class="{ 'is-active': writeLabelForm.filter.type == 3 }"
          >
            USER
          </button>
        </view>
        <view class="select-warp"
          >选择存储区：<uni-data-select
            class="uds"
            v-model="writeLabelForm.selectStore"
            :clear="false"
            :localdata="writeLabelForm.storeList"
          ></uni-data-select
        ></view>
        <label class="my-label">
          地址：
          <input class="ipt" v-model="writeLabelForm.address" />(word)
        </label>
        <label class="my-label">
          长度：
          <input class="ipt" v-model="writeLabelForm.length" />(word)
        </label>
        <label class="my-label">
          访问密码：
          <input class="ipt" v-model="writeLabelForm.password" />
        </label>
        <label class="my-label">
          数据内容：
          <input class="ipt" v-model="writeLabelForm.data" />
        </label>
        <button class="tab-footer-btn" type="primary" @tap="onWriteLabel">
          写入数据
        </button>
      </view>
    </view>
    <!-- tab5********************************************** -->
    <view class="tab5" v-show="currentTabId === 4">
      <view class="select-warp"
        >频段：<uni-data-select
          class="uds"
          v-model="settingsForm.frequency"
          :clear="false"
          :localdata="settingsForm.frequencyList"
        ></uni-data-select
      ></view>

      <view class="btn-warp">
        <button class="btn" type="primary" size="mini" @tap="onWriteFrequency">
          设置频率
        </button>
        <button class="btn" type="primary" size="mini" @tap="onReadFrequency">
          读取频率
        </button>
      </view>
      <view class="select-warp"
        >输出功率（dBm）：<uni-data-select
          class="uds"
          v-model="settingsForm.power"
          :clear="false"
          :localdata="settingsForm.powerList"
        ></uni-data-select
      ></view>
      <view class="btn-warp">
        <button class="btn" type="primary" size="mini" @tap="onWritePower">
          设置功率
        </button>
        <button class="btn" type="primary" size="mini" @tap="onReadPower">
          读取功率
        </button>
      </view>
      <view>蜂鸣器设置</view>
      <view class="btn-warp">
        <button class="btn" type="primary" size="mini" @tap="onOpenBuzzer">
          打开蜂鸣器
        </button>
        <button class="btn" type="primary" size="mini" @tap="onCloseBuzzer">
          关闭蜂鸣器
        </button>
      </view>

      <radio-group @change="radioChangeTab5">
        <label class="my-label">
          EPC
          <radio value="0" :checked="settingsForm.workModel == '0'" />
        </label>
        <label class="my-label">
          EPC+TID
          <radio value="1" :checked="settingsForm.workModel == '1'" />
        </label>
        <label class="my-label">
          EPC+TID+USER
          <radio value="2" :checked="settingsForm.workModel == '2'" />
        </label>
      </radio-group>
      <!-- 只有EPC+TID+USER才展示 -->
      <view class="" v-show="isWorkModelFormShow">
        <label class="my-label">
          User Ptr：
          <input class="ipt" v-model="settingsForm.workModelAddress" />(work)
        </label>
        <label class="my-label">
          User Len：
          <input class="ipt" v-model="settingsForm.workModelLength" />(work)
        </label>
      </view>
      <button class="tab-footer-btn" type="primary" @tap="onSetWorkModel">
        SET
      </button>
    </view>
    <!-- tab6********************************************** -->
    <view class="tab6" v-show="currentTabId === 5">
      <label class="my-label">
        新名称：
        <input
          class="ipt"
          placeholder="请输入英文名称"
          v-model="modifyBleNameForm.name"
        />(work)
      </label>
      <button class="tab-footer-btn" type="primary" @tap="onModifyBleName">
        修改蓝牙名称
      </button>
    </view>
    <!-- tab7********************************************** -->
    <view class="tab7" v-show="currentTabId === 6">
      <view style="text-align: center" v-if="!debug">调试模式未打开</view>
      <template v-else>
        <textarea :auto-height="true" v-model="debugForm.log"></textarea>
        <button class="tab-footer-btn" type="primary" @tap="onClearDebugLog">
          清除日志
        </button>
      </template>
    </view>

    <!-- 搜索新设备弹窗 -->
    <DiscoveryDevice
      v-model:visiable="discoveryDeviceVisiable"
      :isDiscoveryListEmpty="isDiscoveryListEmpty"
      :discoveryList="discoveryList"
      :bluetooth="bluetooth"
      @onScan="onScan"
      @onConnectDevice="onConnectDevice"
      @onCloseDiscoveryDialog="onCloseDiscoveryDialog"
    >
    </DiscoveryDevice>
    <!-- 连接历史记录弹窗 -->
    <HistoryDevice
      v-model:visiable="historyDeviceVisiable"
      :historyList="historyList"
      @onClearHistoryList="onClearHistoryList"
      @onConnectDevice="onConnectDevice"
      @onCloseHistoryDialog="onCloseHistoryDialog"
    >
    </HistoryDevice>
  </view>
</template>

<script>
// 引入组件
import MyTab from "./components/my-tab.vue";
import DiscoveryDevice from "./components/discoveryDevice.vue";
import HistoryDevice from "./components/historyDevice.vue";
import UniDataSelect from "@/components/uni-data-select/uni-data-select.vue";
import UhfMain from "@/mixins/index.js";

export default {
  mixins: [UhfMain],
  // 父亲传来的函数，当盘点到EPC的时候触发该函数，返回的是一个包含EPC的字符串，如果开启了RPC+TID模式，则包含TID
  props: ["getEpc"],
  components: {
    MyTab,
    DiscoveryDevice,
    HistoryDevice,
    UniDataSelect,
  },
};
</script>

<style lang="scss">
.uhf-demo {
  // app的titile
  .nav {
    background-color: #0062cc;
    color: #fff;
    font-size: 30rpx;
    text-align: left;
    padding: 20rpx;
    padding-top: 116rpx;
  }

  // 操作栏
  .operate {
    display: flex;
    padding: 10rpx;

    .btn {
      width: 50%;
    }

    .connect {
      margin-right: 20rpx;
    }
  }

  // 蓝牙名称和状态
  .ble-info {
    padding: 10rpx;
    font-size: 28rpx;

    .desc {
      min-height: 40rpx;
    }
  }

  // commom样式
  .select-warp {
    display: flex;
    align-items: center;

    .uds {
      flex: 1;
    }
  }

  .tab-footer-btn {
    width: 100%;
  }

  //
  .cg {
    display: flex;
    justify-content: space-between;
    padding-bottom: 20rpx;
  }

  .filter-card {
    .my-label {
      display: flex;
      padding-bottom: 20rpx;

      .ipt {
        border-bottom: 1px solid #000;
        flex: 1;
      }
    }

    .btn-warp {
      display: flex;
      justify-content: space-between;
      padding-bottom: 20rpx;

      .btn {
        width: 30%;
      }

      .btn.is-active {
        border: 2rpx solid #007aff !important;
        color: #007aff;
      }
    }

    .tip {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      padding-bottom: 20rpx;

      .btn {
        margin: 0;
        margin-right: 10rpx;
      }
    }
  }

  // tab1的内容
  .tab1 {
    padding: 10rpx;

    .table {
      padding-bottom: 20rpx;

      .tr {
        display: flex;
        justify-content: space-between;
      }

      .td,
      .th {
        padding: 16rpx 0;
        width: 20%;
        text-align: center;
      }

      .th {
        background-color: #f5f7fa;
      }

      .td {
        font-size: 26rpx;
      }

      .td.colspan3 {
        width: 60%;
        flex: none;
      }
    }

    .inventory-btn {
      position: fixed;
      bottom: 10rpx;
      left: 10rpx;
      right: 10rpx;
      display: flex;
      justify-content: space-between;

      .btn {
        width: 25%;
        margin-right: 5rpx;
        font-size: 24rpx;
      }
    }
  }

  .tab2 {
    padding: 10rpx;

    .scan-btn {
      position: fixed;
      bottom: 10rpx;
      left: 10rpx;
      right: 10rpx;
      display: flex;
      justify-content: space-between;

      .btn {
        width: 50%;
        margin-right: 40rpx;
        font-size: 24rpx;
      }
    }
  }

  .tab3,
  .tab4,
  .tab5,
  .tab6,
  .tab7 {
    padding: 10rpx;

    .my-label {
      display: flex;
      padding: 20rpx 0;

      .ipt {
        border-bottom: 1px solid #000;
        flex: 1;
      }
    }
  }

  .tab5 {
    .uni-radio-input {
      bottom: 6rpx;
      margin-left: 10rpx;
    }

    .btn-warp {
      display: flex;
      justify-content: space-between;
      margin: 20rpx 0;

      .btn {
        width: 50%;
      }

      .btn:first-child {
        margin-right: 20rpx;
      }
    }
  }
}
</style>
