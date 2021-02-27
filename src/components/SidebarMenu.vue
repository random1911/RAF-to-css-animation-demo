<template>
  <div ref="holder" :class="holderClass">
    <div
      ref="inner"
      class="sidebar-menu-wrapper__inner"
      @click.self="closeMenu"
    >
      <aside
        ref="sidebar"
        :class="menuClass"
        :style="transformStyle"
        @animationend="handleAnimationEnd"
      >
        <div v-if="showCross" class="sidebar-menu__cross" />
        <div class="sidebar-menu__content" @scroll="handleInnerScroll">
          <slot />
        </div>
      </aside>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import VS, { EventData } from "vanilla-swipe";

enum SidebarMenuDisplayState {
  HIDDEN = "hidden",
  VISIBLE = "visible",
  LEAVING = "leaving",
  ENTERING = "entering"
}

@Component<SidebarMenuContainer>({
  name: "SidebarMenuContainer"
})
export default class SidebarMenuContainer extends Vue {
  $refs!: {
    inner: HTMLDivElement;
    sidebar: HTMLElement;
    holder: HTMLDivElement;
  };
  private swipeListener!: VS;

  @Prop({
    type: Boolean,
    default: true
  })
  readonly isHidden!: boolean;
  @Prop({
    type: Number,
    default: 80
  })
  readonly offsetToHide!: number;
  /** local state */
  private displayState: SidebarMenuDisplayState = this.isHidden
    ? SidebarMenuDisplayState.HIDDEN
    : SidebarMenuDisplayState.VISIBLE;
  private isScrolling = false;
  private rightOffset = 0;
  private lastKnownOffset = 0;
  private isDragging = false;
  private isAnimating = false;

  /** getters */
  get isVisibleState() {
    return this.displayState === SidebarMenuDisplayState.VISIBLE;
  }

  get isHiddenState() {
    return this.displayState === SidebarMenuDisplayState.HIDDEN;
  }

  get isLeaving() {
    return this.displayState === SidebarMenuDisplayState.LEAVING;
  }

  get isEntering() {
    return this.displayState === SidebarMenuDisplayState.ENTERING;
  }

  get holderClass() {
    const baseClass = "sidebar-menu-wrapper";
    return {
      [baseClass]: true,
      [`${baseClass}--is-hidden`]: this.isHiddenState,
      [`${baseClass}--is-entering`]: this.isEntering,
      [`${baseClass}--is-leaving`]: this.isLeaving,
      [`${baseClass}--is-blurred`]: !this.isHiddenState
    };
  }

  get menuClass() {
    const baseClass = "sidebar-menu";
    return {
      [baseClass]: true,
      [`${baseClass}--is-entering`]: this.isEntering,
      [`${baseClass}--is-leaving`]: this.isLeaving,
      [`${baseClass}--is-hidden`]: this.isHiddenState,
      [`${baseClass}--is-dragging`]: this.isDragging
    };
  }

  get transformStyle() {
    if (!this.isDragging || this.isHiddenState || this.rightOffset > 0) {
      return {};
    }
    return { transform: `translate(${this.rightOffset || 0}px, 0` };
  }

  get showCross() {
    return !this.isDragging && this.isVisibleState;
  }

  /** life-cycle */
  mounted() {
    this.syncTransformCssVar();
    this.enableSwiper();
    if (!this.isHidden) {
      this.disableScroll();
    }
  }

  beforeDestroy() {
    this.enableScroll();
    if (this.swipeListener) {
      this.swipeListener.destroy();
    }
  }

  /** swiper */
  private syncTransformCssVar(value = 0) {
    /** set property for leave animation start synced to swipe */
    const { sidebar } = this.$refs;
    if (!sidebar) {
      return;
    }
    sidebar.style.setProperty("--transformLeft", `${value}px`);
  }

  private handleReturn() {
    this.isDragging = false;
    this.rightOffset = 0;
    this.syncTransformCssVar();
  }

  private handleDragStart() {
    if (this.isScrolling) {
      this.handleReturn();
      return;
    }
    this.isDragging = true;
  }

  private onAnimationFrame() {
    if (!this.isAnimating) {
      return;
    }
    const { lastKnownOffset } = this;
    this.rightOffset = lastKnownOffset;
    if (lastKnownOffset <= 0) {
      this.syncTransformCssVar(lastKnownOffset);
    }
    this.isAnimating = false;
  }

  private handleDragEnd(event: Event, eventData: EventData) {
    const { deltaX } = eventData;
    this.isDragging = false;
    if (this.isScrolling) {
      this.handleReturn();
      return;
    }
    event.stopImmediatePropagation();
    if (event.cancelable) {
      event.preventDefault();
    }
    if (-deltaX >= this.offsetToHide) {
      this.closeMenu();
      return;
    }
    this.handleReturn();
  }

  private handleDrag(event: Event, { deltaX, absX, absY }: EventData) {
    const isVertical = absY > absX && absX < 50;
    if (isVertical || this.isScrolling) {
      this.handleReturn();
      this.lastKnownOffset = 0;
      return;
    }
    event.stopPropagation();
    this.lastKnownOffset = deltaX;
    if (this.isAnimating) {
      return;
    }
    this.isAnimating = true;
    window.requestAnimationFrame(this.onAnimationFrame.bind(this));
  }

  private enableSwiper() {
    const { holder, inner } = this.$refs;
    if (!holder || !inner || process.env.VUE_APP_RENDERING_SSR) return;
    this.swipeListener = new VS({
      element: holder,
      target: inner,
      onSwiping: this.handleDrag,
      onSwiped: this.handleDragEnd,
      onSwipeStart: this.handleDragStart,
      mouseTrackingEnabled: true,
      delta: 20
    });
    this.swipeListener.init();
  }

  /** animation */
  private onLeave() {
    /** adds classes what enables leave animation
     * @see this.handleAnimationEnd */
    this.displayState = SidebarMenuDisplayState.LEAVING;
  }

  private onEnter() {
    /** adds classes what enables enter animation
     * @see this.handleAnimationEnd */
    this.displayState = SidebarMenuDisplayState.ENTERING;
    this.disableScroll();
  }

  @Watch("isHidden", { immediate: true })
  private handleAppears() {
    if (this.isHidden) {
      if (this.isVisibleState) {
        this.onLeave();
        return;
      }
      if (this.isLeaving) {
        this.closeMenu();
        return;
      }
    }
    if (!this.isHidden && this.isHiddenState) {
      this.onEnter();
    }
  }

  private handleAnimationEnd() {
    if (this.isEntering) {
      this.displayState = SidebarMenuDisplayState.VISIBLE;
    }
    if (this.isLeaving) {
      this.displayState = SidebarMenuDisplayState.HIDDEN;
      this.enableScroll();
    }
  }

  private closeMenu() {
    this.enableScroll();
    this.$emit("close-menu");
  }

  private disableScroll() {
    // should be provided somehow
  }

  private enableScroll() {
    // should be provided somehow
  }

  private handleInnerScroll() {
    // debounced method to disable swipe handle ducring scrolling
  }
}
</script>

<style lang="scss" scoped>
$menuAnimationTime: 0.25s;
$menuWidth: 300px;
$extraPadding: 60px;
@keyframes menuIn {
  from {
    transform: translate(-100%, 0);
  }
  to {
    transform: translate(0, 0);
  }
}

@keyframes menuOut {
  from {
    transform: translate(var(--transformLeft), 0);
  }
  to {
    transform: translate(-100%, 0);
  }
}

@keyframes opacityIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes opacityOut {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}

.sidebar-menu-wrapper {
  position: fixed;
  top: 0;
  right: 0;
  bottom: -$extraPadding;
  left: 0;
  z-index: 999;
  overflow: hidden;
  transform: scale(1);
  transform-origin: top left;

  &--is-hidden {
    transform: translateX(-100px) scale(0);
    pointer-events: none;

    &:before {
      opacity: 0;
    }
  }

  &--is-blurred {
    &:before {
      backdrop-filter: blur(5px);
    }
  }

  &:before,
  &__inner {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }

  &:before {
    background-color: rgba(0, 0, 0, 0.6);
    animation: $menuAnimationTime ease forwards;
    content: "";
    will-change: opacity;
  }

  &--is-entering:before {
    animation-name: opacityIn;
  }

  &--is-leaving:before {
    animation-name: opacityOut;
  }
}

.sidebar-menu {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  width: calc(100% - 44px);
  max-width: $menuWidth;
  height: 100%;
  max-height: 100vh;
  max-height: -webkit-fill-available;
  padding-bottom: $extraPadding;
  background-color: #464646;
  color: #fff;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
  transform: translate(0, 0);
  transition: 0.2s ease;
  transition-property: transform;
  animation: $menuAnimationTime ease forwards;
  will-change: transform;

  &--is-entering {
    animation-name: menuIn;
  }

  &--is-leaving {
    animation-name: menuOut;
  }

  &--is-dragging,
  &--is-entering,
  &--is-leaving {
    transition: none;
  }

  &--is-hidden {
    transform: translate(-100%, 0);
  }

  &__cross {
    position: absolute;
    top: 20px;
    right: -28px;
    width: 14px;
    height: 14px;
    opacity: 0;
    animation: opacityIn 0.2s ease forwards;
    pointer-events: none;

    &:before,
    &:after {
      position: absolute;
      top: 50%;
      right: 0;
      left: 0;
      height: 2px;
      margin-top: -1px;
      background-color: #ccc;
      transform-origin: center;
      content: "";
    }

    &:before {
      transform: rotate(45deg);
    }

    &:after {
      transform: rotate(-45deg);
    }
  }

  &__content {
    position: absolute;
    top: 0;
    right: 0;
    bottom: $extraPadding;
    left: 0;
    overflow-x: hidden;
    overflow-y: auto;
    overscroll-behavior: contain;
  }
}
</style>
