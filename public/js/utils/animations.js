import gsap, { Expo } from "https://esm.run/gsap"

// remove when animation completes
const removeOnComplete = (config, element) => { if(config.remove) element.remove() }

export const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms))

// shared properties across all animations
export const shared = (config={}, baseAnimation={}) => ({
    duration: 1,
    ease: Expo.easeInOut,
    ...baseAnimation,
    ...config
})

// animate in
export const scaleIn = (element, config) => gsap.from(element, shared(config, { scale: 0 }))
export const fadeIn = (element, config) => gsap.from(element, shared(config, { opacity: 0 }))

// animate out
export const scaleOut = (element, { remove, ...config }={}) => {
    const animation = shared(config, { scale: 0 })
    if(remove) { animation.onComplete = () => element.remove() }    

    gsap.to(element, animation)
}

export const fadeOut = (element, { remove, ...config }={}) => {
    const animation = shared(config, { opacity: 0 })
    if(remove) { animation.onComplete = () => element.remove() }    

    gsap.to(element, animation)
}