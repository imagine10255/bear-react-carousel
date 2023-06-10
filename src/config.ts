
// debug log switch
export const logEnable = {
    componentDidMount: false,
    componentWillUnmount: false,
    shouldComponentUpdate: false,
    dragger: {
        onMobileTouchStart: false,
        onMobileTouchMove: false,
        onMobileTouchEnd: false,
        onWebMouseStart: false,
        onWebMouseMove: false,
        onWebMouseEnd: false,
        onDragMove: false,
        onDragEnd: false,
    },
    controller: {
        onSlideResetToMatchIndex: false,
    },
    autoPlayer: {
        play: false,
        pause: false,
    },
    windowSizer: {
        onResize: false,
    },
    syncCarousel: {
        onSyncControlMove: false,
        onSyncControlDone: false,
        onSlideToActualIndex: false,
    }
};
