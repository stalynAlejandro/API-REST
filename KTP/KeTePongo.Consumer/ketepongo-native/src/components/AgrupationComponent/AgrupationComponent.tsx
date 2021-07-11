import React, { useEffect } from 'react'
import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import { TitleComponent } from 'components'
import GrouByIcon from '../../../assets/svg/buttons/groupBy.svg'
import styles from './AgrupationComponent.style'

const Option = ({ title, selected, onPressOption }) => {

    const selectOption = () => onPressOption(title)

    return (
        <View style={styles.option}>
            <TouchableOpacity onPress={selectOption}>
                <Text style={(selected === title) ? styles.optionSelected : styles.option}>{title}</Text>
            </TouchableOpacity>
            {(selected === title) && <View style={styles.lineSelected}></View>}
        </View>
    )
}

const TabNavigator = ({ options, selected, onPressOption, onPressGroup }) => {

    return (
        <View style={styles.optionGroup}>
            <TouchableOpacity onPress={onPressGroup} style={styles.icon} >
                <GrouByIcon width={23} height={23} />
            </TouchableOpacity>
            <ScrollView horizontal={true} style={styles.tabNavigator} showsHorizontalScrollIndicator={false} >
                {options.map((x: string) => <Option title={x} selected={selected} onPressOption={onPressOption} />)}
            </ScrollView >
        </View>
    )
}

export function AgrupationComponent({ options, tags, selected, onPressOption, onPressGroup, title }) {

    useEffect(() => {
        if (tags.length > 0) {
            onPressOption(tags[0])
        }
    }, [])

    return (
        <View>
            <TitleComponent title={title} />
            <TabNavigator options={(tags.length > 0) ? options.filter((o) => tags.includes(o)) : options} selected={selected} onPressOption={onPressOption} onPressGroup={onPressGroup} />
        </View>
    )
}
