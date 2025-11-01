const regexNavigatorMovileDevices = /Mobi|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i

export const isMobileDevice = (): boolean => {
    if (typeof navigator === "undefined") return false;
    return regexNavigatorMovileDevices.test(
        navigator.userAgent
    );
};
