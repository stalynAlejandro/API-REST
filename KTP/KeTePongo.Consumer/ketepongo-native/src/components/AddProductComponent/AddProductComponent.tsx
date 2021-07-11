import React, { useState } from 'react'
import { Text, View, TouchableOpacity, TextInput, ScrollView } from 'react-native'
import { COLORS } from 'constants'
import styles from './AddProductComponent.style'
import ArrowIconActive from 'assets/svg/arrows/chevronActive.svg'
import ArrowIconInactive from 'assets/svg/arrows/chevronInactive.svg'
import CheckIcon from 'assets/svg/arrows/check.svg'
import DeleteButton from 'assets/svg/buttons/remove.svg'
import CheckBoxOff from 'assets/svg/checkbox/checkBoxOff.svg'
import CheckBoxOn from 'assets/svg/checkbox/checkBoxOn.svg'

const HeadModal = ({ provider, continueEnabled, onPressAdd, onClose }) => {
    return (
        <View style={styles.rowContainer}>
            <View>
                <Text style={styles.titleModal}>Nuevo Producto</Text>
                <Text style={styles.subTitleModal}>{provider}</Text>
            </View>

            {(continueEnabled) ?
                <TouchableOpacity onPress={onPressAdd} style={styles.rowContainer}>
                    <Text style={{ ...styles.titleModal, fontWeight: 'normal' }}>Añadir</Text>
                    <CheckIcon width={20} height={20} />
                </TouchableOpacity>
                :
                <TouchableOpacity onPress={onClose} style={styles.finishButton}>
                    <Text style={styles.finishText}>Finalizar</Text>
                </TouchableOpacity>
            }
        </View>
    )
}

const BodyModal = ({ provider, productName, continueEnabled, onPressContinue, onChangeText }) => {

    const onPressDelete = () => onPressContinue(false)

    return (
        <View>
            {(continueEnabled) ?
                <View style={styles.productContainer}>
                    <View>
                        <Text style={{ ...styles.finishText, fontSize: 14 }}>Producto</Text>
                        <Text style={{ ...styles.titleModal, fontWeight: 'normal', fontSize: 14 }}>{productName}</Text>
                    </View>
                    <TouchableOpacity onPress={onPressDelete}>
                        <DeleteButton width={25} height={25} />
                    </TouchableOpacity>
                </View>
                :
                <View>
                    <TextInput onChangeText={text => onChangeText(text)} autoFocus={true} maxLength={20} placeholder={'Escribe el producto'} placeholderTextColor={COLORS.lightGray} />
                    <View style={styles.line}></View>
                    <Text style={styles.infoText}>Añade el producto de forma manual a la lista {provider}</Text>
                </View>
            }
        </View>
    )
}

const FooterModal = ({ productName, locations, continueEnabled, selectedLocations, setSelectedLocations, onPressContinue }) => {

    const pressContinueButton = () => { (productName.length > 0) ? onPressContinue(true) : onPressContinue(false) }

    return (
        <View style={{ ...styles.rowContainer, flex: 1 }}>
            {(continueEnabled) ?
                <View style={{ ...styles.productContainer, flexDirection: 'column' }}>
                    <Text style={{ ...styles.infoText, fontStyle: 'normal', fontSize: 14, marginVertical: 10, }}>¿A qué ubicaciones pertenece este producto?</Text>
                    <ScrollView>
                        <SelectUbications locations={locations} selectedLocations={selectedLocations} setSelectedLocations={setSelectedLocations} />
                    </ScrollView>
                </View>
                :
                <TouchableOpacity style={styles.continueButton} onPress={pressContinueButton}>
                    <Text style={(productName.length > 0) ? styles.active : styles.inactive}>Continuar</Text>
                    {(productName.length > 0) ? <ArrowIconActive /> : <ArrowIconInactive />}
                </TouchableOpacity>
            }
        </View>
    )
}

const SelectUbications = ({ locations, selectedLocations, setSelectedLocations }) => {

    const addSelected = (loc) => {
        let array = [...selectedLocations]
        if (!array.includes(loc)) {
            array.push(loc)
            setSelectedLocations(array)
        } else {
            setSelectedLocations(array.filter(item => item !== loc))
        }

        RenderLocations()
    }

    const RenderLocations = () => (
        <View>
            {locations.map((loc) => (
                <View>
                    <TouchableOpacity onPress={x => addSelected(loc)} style={selectedLocations.includes(loc) ? styles.locationContainerSelected : styles.locationContainer}>
                        <Text style={styles.locationsText}>{loc}</Text>
                        {selectedLocations.includes(loc) ? <CheckBoxOn style={styles.checkBox} /> : <CheckBoxOff style={styles.checkBox} />}
                    </TouchableOpacity>
                    <View style={styles.locationsLine}></View>
                </View>
            ))}
        </View>
    )

    return <RenderLocations />
    
}

const MenuModal = ({ provider, locations, productName, continueEnabled, onPressContinue, onClose, selectedLocations, setSelectedLocations, onPressAdd, onChangeText }) => {
    return (
        <View style={styles.insideArea}>
            <HeadModal provider={provider} continueEnabled={continueEnabled} onPressAdd={onPressAdd} onClose={onClose} />
            <BodyModal provider={provider} productName={productName} continueEnabled={continueEnabled} onPressContinue={onPressContinue} onChangeText={onChangeText} />
            <FooterModal productName={productName} locations={locations} continueEnabled={continueEnabled} selectedLocations={selectedLocations} setSelectedLocations={setSelectedLocations} onPressContinue={onPressContinue} />
        </View>
    )
}

export const AddProductComponent = ({ provider, locations, selectedLocations, newProductName, setNewProductName, setSelectedLocations, onPressAddNewProduct, onClose }) => {

    const [continueEnabled, setContinueEnabled] = useState(false)

    const onPressAdd = () => {
        onPressAddNewProduct()
        onClose()
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.outsideArea} onPress={onClose}></TouchableOpacity>
            <MenuModal
                provider={provider}
                locations={locations}
                productName={newProductName}
                continueEnabled={continueEnabled}
                onPressContinue={setContinueEnabled}
                selectedLocations={selectedLocations}
                setSelectedLocations={setSelectedLocations}
                onChangeText={setNewProductName}
                onPressAdd={onPressAdd}
                onClose={onClose}
            />
        </View>
    )
}
