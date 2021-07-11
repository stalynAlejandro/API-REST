import React from 'react';
import * as components from 'components';
import { COLORS } from 'constants';

const ComponentFactory = (displayName, tag) => {
    const TagName = components[tag];
    const SingleComponent = React.forwardRef((props, ref) => (<TagName ref={ref} {...props} />));
    SingleComponent.displayName = displayName;
    return (SingleComponent)
}

const InputHookAppFactory = (nameInput, displayName, placeholder, validateEmail) => {
    const InputForm = ComponentFactory(displayName, "DefaultHookFormTextInput");
    return React.forwardRef((props, ref) => (
        <InputForm
            ref={ref}
            name={nameInput}
            placeholder={placeholder}
            rules={{ required: "Campo Obligatorio", validate: validateEmail ?? true }}
            borderColor={COLORS.main}
            textColor={COLORS.neutral_strong}
            placeholderTextColor={COLORS.gray_3}
            {...props}
        ></InputForm>
    ));
};

const InputHookAppFactoryNumber = (nameInput, displayName, placeholder) => {
    const InputForm = ComponentFactory(displayName, "DefaultHookFormTextInput");
    return React.forwardRef((props, ref) => (
        <InputForm
            ref={ref}
            name={nameInput}
            placeholder={placeholder}
            rules={{ required: "Campo Obligatorio y deben ser números", pattern:  /^\d+$/ }}
            borderColor={COLORS.main}
            textColor={COLORS.neutral_strong}
            placeholderTextColor={COLORS.gray_3}
            {...props}
        ></InputForm>                                                   
    ));
};


export { ComponentFactory, InputHookAppFactory, InputHookAppFactoryNumber };


