<template>
  <div
    class="myKeyboard"
    @click.stop="handleFocus"
    @blur="handleBlur"
    tabindex="0"
  >
    <div class="input-container">
      <div class="input-top">
        <div class="input-label" :style="labelStyle" :class="labelClass">
          {{ inputLabel }}
        </div>
        <div
          class="inputText"
          id="inputText"
          :style="inputStyle"
          :class="inputClass"
        >
          <span class="cursor">
            <span class="holder showWhite">|</span>
          </span>
          <span class="place-holder">{{ placeHolder }}</span>
          <span
            class="right-space"
            :style="{ color: zcolor }"
            @click="moveCursor"
            >占位</span
          >
          <span class="right-btn">
            <!-- <span v-if="clearShow" class="clear" @click="handleClear"> -->
            <img
              v-if="clearShow"
              class="clear fonttt" 
              @click="handleClear"
              src="@/assets/Icon-fill-circlearrow-left.png"
              alt=""
            />
            <slot></slot>
          </span>
        </div>
      </div>

      <div class="error" :style="errorStyle" v-if="errorShow">
        {{ errorMessage }}
      </div>
      <div class="errorSpace" v-else></div>
    </div>
    <div class="number hidden" :class="numberClass" :style="numberStyle">
      <div class="mybtn" @click.stop="handleBlur">
        <img src="@/assets/down.png" alt="" />
      </div>
      <div class="mynum">
        <div class="num" @click="handleNum('1')">1</div>
        <div class="num" @click="handleNum('2')">2</div>
        <div class="num" @click="handleNum('3')">3</div>
        <div class="num" @click="handleNum('4')">4</div>
        <div class="num" @click="handleNum('5')">5</div>
        <div class="num" @click="handleNum('6')">6</div>
        <div class="num" @click="handleNum('7')">7</div>
        <div class="num" @click="handleNum('8')">8</div>
        <div class="num" @click="handleNum('9')">9</div>
       <div v-if="keyboard == 'card'" class="num" @click="handleNum('.')">
          .
        </div>
        <div v-if="keyboard == 'tel'" class="num" @click="handleNum('0')">
          0
        </div>
        <div class="num" @click="handleNum('0')">0</div>
        <div
          class="num"
          @click.stop="handleDelete"
          @touchstart="gtouchstart"
          @touchend="gtouchend"
          @touchmove="gtouchmove"
        >
          <img class="fonttt" src="@/assets/Icon-fill-circlearrow-left.png" alt="" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    // inputS: {
    //   type: String,
    //   default: '',
    // },
    // inputH: {
    //   type: String,
    //   default: '2.5rem',
    // },
    // inputB: {
    //   type: String,
    //   default: 'none',
    // },
    // inputW: {
    //   type: String,
    //   default: '',
    // },
    // inputBgc: {
    //   type: String,
    //   default: '#fff',
    // },
    // labelS: {
    //   type: String,
    //   default: '',
    // },
    // labelC: {
    //   type: String,
    //   default: '',
    // },
    // labelW: {
    //   type: String,
    //   default: '',
    // },
    // 输入框索引（必填字段）
    indexNum: {
      type: Number,
      default: 0,
    },
    // 是否聚焦（true:不聚焦，false:聚焦）
    numberDis: {
      type: Boolean,
      default: false,
    },
    // 是否必填（true:出现红星，false:不出现）
    required: {
      type: Boolean,
      default: false,
    },
    // 键盘类型（card:身份证，tel:数字）
    keyboard: {
      type: String,
      default: 'card',
    },
    // 父组件存的值
    oldValue: {
      type: String,
      default: '',
    },
    // 占位符颜色（建议设置和输入框背景同色）
    zcolor: {
      type: String,
      default: '#fff',
    },
    // label文字
    inputLabel: {
      type: String,
      default: '',
    },
    // 当输入框内无文字时显示
    placeHolder: {
      type: String,
      default: '请输入',
    },
    // 错误提示信息
    errorMessage: {
      type: String,
      default: '请输入正确的信息',
    },
    // 是否显示错误提示信息
    errorShow: {
      type: Boolean,
      default: false,
    },
    // 错误提示信息样式
    errorStyle: {
      type: Object,
      default: function () {
        return {}
      },
    },
    // 是否显示清除键
    clearShow: {
      type: Boolean,
      default: false,
    },
    // label动态类名
    labelClass: {
      type: String,
      default: '',
    },
    // label样式
    labelStyle: {
      type: Object,
      default: function () {
        return {}
      },
    },
    // input动态类名
    inputClass: {
      type: String,
      default: '',
    },
    // input样式
    inputStyle: {
      type: Object,
      default: function () {
        return {}
      },
    },
    // number类名
    numberClass: {
      type: String,
      default: '',
    },
    // number样式
    numberStyle: {
      type: Object,
      default: function () {
        return {}
      },
    },
  },
  data() {
    return {
      inputArea: '',
      stop: false,
      clickNum: false,
      show: false,
      value: '',
      inputValue: '',
    }
  },
  watch: {
    oldValue(val) {
      if (val != this.inputValue) {
        this.handleClear()
        this.handleOld()
      }
    },
    required(val) {
      this.handleRequired(val)
    },
  },
  created() {
    
  },
  mounted() {
    this.handleRequired(this.required)
    this.handleOld()
  },
  methods: {
    // 是否必填
    handleRequired(val) {
      const inputLabel =
        document.getElementsByClassName('input-label')[this.indexNum]
      if (val) {
        inputLabel.className = 'input-label required'
      } else {
        inputLabel.className = 'input-label'
      }
    },
    // 父组件改变值
    handleOld() {
      // 获取父组件存的值后画数字
      if (this.oldValue != '') {
        for (const item of this.oldValue) {
          const span = document.createElement('span') //创建包含值的元素
          span.className = 'val'
          span.innerText = item
          const space = document.createElement('span')
          space.className = 'space'
          space.innerText = ''
          span.addEventListener('click', this.moveCursor)
          const cursor =
            document.getElementsByClassName('cursor')[this.indexNum]
          const inputArea =
            document.getElementsByClassName('inputText')[this.indexNum]
          inputArea.insertBefore(space, cursor) //插入空列
          inputArea.insertBefore(span, cursor) //插入值
        }
      }
      const placeHolder =
        document.getElementsByClassName('place-holder')[this.indexNum]

      if (this.oldValue == '') {
        placeHolder.className = 'place-holder'
      } else {
        placeHolder.className = 'place-holder hidden'
      }
      this.inputValue = this.oldValue
      this.$emit('keyboard-input', this.inputValue)
    },
    // 聚焦
    handleFocus(event) {
      if (!this.numberDis) {
        this.$emit('indexNum', this.indexNum)
        const number = document.getElementsByClassName('number')[this.indexNum]
        number.className = 'number'
        this.setCursorFlash()
        this.handleValue()
      }
    },
    //字符插入，在光标前插入字符
    handleNum(value) {
      const number = document.getElementsByClassName('number')[this.indexNum]
      number.className = 'number'
      const span = document.createElement('span') //创建包含值的元素
      span.className = 'val'
      span.innerText = value

      const space = document.createElement('span')
      space.className = 'space'
      space.innerText = ''
      span.addEventListener('click', this.moveCursor)
      const cursor = document.getElementsByClassName('cursor')[this.indexNum]
      const inputArea =
        document.getElementsByClassName('inputText')[this.indexNum]
      inputArea.insertBefore(space, cursor) //插入空列
      inputArea.insertBefore(span, cursor) //插入值
      this.handleValue()
    },
    // 失焦
    handleBlur(e) {
      clearInterval(this.intervalId)
      const placeHolder =
        document.getElementsByClassName('holder')[this.indexNum]
      placeHolder.className = 'holder showWhite'
      const number = document.getElementsByClassName('number')[this.indexNum]
      number.className = 'number hidden'
      const inputText =
        document.getElementsByClassName('inputText')[this.indexNum]
      inputText.className = 'inputText'
      this.handleValue()
      const inputArea =
        document.getElementsByClassName('inputText')[this.indexNum]
      const reset =
        document.getElementsByClassName('place-holder')[this.indexNum]
      const cursor = document.getElementsByClassName('cursor')[this.indexNum] //获取光标
      const ele = inputArea.replaceChild(reset.previousSibling, cursor)
      inputArea.insertBefore(ele, reset)
    },
    // 移动光标位置
    moveCursor(event) {
      const inputArea =
        document.getElementsByClassName('inputText')[this.indexNum]
      const cursor = document.getElementsByClassName('cursor')[this.indexNum] //获取光标
      if (event.currentTarget.className == 'right-space') {
        const ele = inputArea.replaceChild(
          event.currentTarget.previousSibling.previousSibling,
          cursor,
        )
        inputArea.insertBefore(ele, event.currentTarget.previousSibling)
      } else {
        const tempEle = event.currentTarget
        const nodeName = event.currentTarget.nextSibling.nodeName
        const temp = event.currentTarget.previousSibling
        const ele = inputArea.replaceChild(temp, cursor) //把光标替换成当前元素
        inputArea.insertBefore(ele, event.currentTarget)
      }
    },
    // 删除
    handleDelete() {
      const inputArea =
        document.getElementsByClassName('inputText')[this.indexNum]
      //   this.setCursorFlash()
      const cursor = document.getElementsByClassName('cursor')[this.indexNum]
      let n = 2 //两个删除动作
      while (cursor.previousSibling && n > 0) {
        inputArea.removeChild(cursor.previousSibling)
        n--
      }
      this.handleValue()
    },
    //开始按
    gtouchstart(e) {
      this.timeOutEvent = setTimeout(() => {
        this.longPress()
      }, 500)
      return false
    },
    gtouchend() {
      clearTimeout(this.timeOutEvent)
      clearInterval(this.press)
      if (this.timeOutEvent != 0) {
        // alert('你这是点击，不是长按')
      }
      return false
    },
    gtouchmove() {
      clearTimeout(this.timeOutEvent)
      clearInterval(this.press)
      this.timeOutEvent = 0
    },
    longPress() {
      this.timeOutEvent = 0
      this.press = setInterval(() => {
        this.handleDelete()
      }, 300)
    },
    //设置光标定时任务
    setCursorFlash() {
      const placeHolder =
        document.getElementsByClassName('holder')[this.indexNum]
      let isShowCursor = false
      if (this.intervalId) {
        clearInterval(this.intervalId)
      }
      this.intervalId = setInterval(function () {
        isShowCursor = !isShowCursor
        if (isShowCursor) {
          placeHolder.className = 'holder'
        } else {
          placeHolder.className = 'holder showWhite'
        }
      }, 500)
    },
    // 全清
    handleClear() {
      const father = document.getElementsByClassName('inputText')[this.indexNum]
      const child =
        document.getElementsByClassName('inputText')[this.indexNum].childNodes
      for (let i = child.length - 1; i >= 0; i--) {
        if (child[i].className == 'val' || child[i].className == 'space') {
          father.removeChild(child[i])
        }
      }
    },
    // 获取值
    handleValue() {
      const val = document
        .getElementsByClassName('inputText')
        [this.indexNum].querySelectorAll('.val')
      const arr = []
      arr[this.indexNum] = []
      for (let i = 0; i < val.length; i++) {
        arr[this.indexNum].push(val[i].innerHTML)
      }
      this.inputValue = arr[this.indexNum].toString()
      this.inputValue = this.inputValue.split(',').join('')
      this.$emit('keyboard-input', this.inputValue)
      const placeHolder =
        document.getElementsByClassName('place-holder')[this.indexNum]

      if (this.inputValue == '') {
        placeHolder.className = 'place-holder'
      } else {
        placeHolder.className = 'place-holder hidden'
      }
    },
  },
}
</script>

<style scoped lang="less">
// .myKeyboard:focus {
//   outline: none;
// }
.input-container {
  display: flex;
  // align-items: center;
  flex-direction: column;
  box-sizing: border-box;
  padding: 1rem;
  padding-bottom: 0.2rem;
  width: 100%;
  border-bottom: 1px solid #eee;
  background: #fff;
  font-size: 1.04rem;
  .acitve {
    border: 1px solid #2e8fff !important;
  }
  .input-top {
    display: flex;
    align-items: center;
    box-sizing: border-box;
    width: 100%;
  }
  .error {
    color: #ee0a24;
    font-size: 0.75rem;
  }
  .errorSpace {
    width: 1rem;
    height: 1.2rem;
  }
  .required::before {
    position: absolute;
    left: 0.5rem;
    color: #ee0a24;
    content: '*';
    font-size: 0.875rem;
  }
  .inputText {
    position: relative;
    flex: 1;
    width: 80%;
    border: none;
  }
  .right-btn {
    position: absolute;
    right: 2%;
    .clear {
      width: 1.5rem;
    }
    // :nth-child(1) {
    //   width: 1.5rem;
    // }
    :nth-child(2) {
    }
  }

  .right-space {
    // color: #fff;
  }
  .place-holder {
    color: #c8c8c8;
  }
}
.number {
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 999999;
  padding-bottom: 2%;
  width: 100%;
  background-color: #f0f0f0;
  font-size: 2rem;
  .mybtn {
    height: 2rem;
    text-align: center;
    line-height: 2rem;
    img {
      height: 100%;
    }
  }
  .mynum {
    display: flex;
    flex-wrap: wrap;
    height: calc(100% - 2rem);
    .num {
      display: flex;
      align-items: center;
      flex: 1 0 30%;
      justify-content: center;
      height: 3.4rem;
      border-top: 1px solid #eee;
      border-left: 1px solid #eee;
      background-color: #fff;
      text-align: center;

      &:active {
        background-color: rgb(202, 202, 202);
      }
      img {
        // height: 100%;
        pointer-events: none;
      }
    }
  }
}
.hidden {
  display: none;
}
.showWhite {
  color: #fff;
}
.fonttt{
	width: 33px;
}
</style>





