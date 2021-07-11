import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { BackHandler } from 'react-native'

export function useDialog(...args: Function[]) {
    const dispatch = useDispatch();

    const [displayDialog, setDisplayDialog] = useState(false);

    const openDialog = () => setDisplayDialog(true)

    const onPressCancel = () => setDisplayDialog(false)

    const onPressOk = () => {
        setDisplayDialog(false)
        args = Array.prototype.slice.call(arguments);
        args.forEach(f => dispatch(f()))
    }

    return { displayDialog, onPressCancel, onPressOk, openDialog }
}

export function useBack(...args: Function[]) {
    useEffect(() => {
        BackHandler.addEventListener("hardwareBackPress", backAction);
        return () => BackHandler.removeEventListener("hardwareBackPress", backAction);
    }, []);

    const backAction = () => {
        args = Array.prototype.slice.call(arguments);
        args.forEach(f => f())
        return true
    }

    return { backAction }
}

export function useBackDispatch(...args: Function[]) {
    const dispatch = useDispatch();

    useEffect(() => {
        BackHandler.addEventListener("hardwareBackPress", backAction);
        return () => BackHandler.removeEventListener("hardwareBackPress", backAction);
    }, []);

    const backAction = () => {
        args = Array.prototype.slice.call(arguments);
        args.forEach(f => dispatch(f()))
        return true
    }

    return { backAction }
}


export function useBackHardware(f: Function) {

    useEffect(() => {
        BackHandler.addEventListener("hardwareBackPress", backAction);
        return () => BackHandler.removeEventListener("hardwareBackPress", backAction);
    }, []);

    const backAction = () => f()

    return { backAction }
}