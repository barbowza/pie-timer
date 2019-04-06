"use strict";

export function Animator (pie, timer) {
    this._pie = pie;
    this._timer = timer;
    this._animationFrameRequest = null; // handle

}

/**
 * Animation is driven by the browser repaint event 
 * https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame
 */
Animator.prototype.start = function () {
    const animate = () => {
        this._timer.tick();
        const percentage = this._pie.percentage = this._timer.percentElapsed;
        this._pie.draw();
        if (percentage >= 1) {
            this._timer.lap();
        }
        this._animationFrameRequest = requestAnimationFrame(animate);   // Setup the next tick
    };
    animate();  // Perform the first tick
}

Animator.prototype.pause = function () {
    cancelAnimationFrame(this._animationFrameRequest);
    this._animationFrameRequest = null;
}
