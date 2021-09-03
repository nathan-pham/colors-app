import gsap, { Expo } from "https://esm.sh/gsap"

export const scaleIn = (element, { config={} }={}) => {
    gsap.from(element, {
        ...config,
        scale: 0,
        duration: 1,
        ease: Expo.easeInOut
    })
}

export const scaleOut = (element, { config={} }={}) => {
    gsap.to(element, {
        ...config, 
        scale: 0,
        duration: 1,
        ease: Expo.easeInOut
    })
}

export const fadeIn = (element, { config={} }={}) => {
    gsap.from(element, {
        ...config,
        opacity: 0,
        duration: 1,
        ease: Expo.easeInOut
    })
}

export const fadeOut = (element, { remove=false, config={} }={}) => {
    gsap.to(element, {
        ...config,
        opacity: 0,
        duration: 1,
        ease: Expo.easeInOut,
        onComplete: () => {
            if(remove) {
                element.remove()
            }
        }
    })
}