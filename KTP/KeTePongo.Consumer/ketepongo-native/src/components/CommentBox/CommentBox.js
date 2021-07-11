import React from 'react';
import PropTypes from 'prop-types';
import { View, TextInput } from 'react-native';
import { TouchableIcon } from 'components';

import styles from './CommentBox.component.styles';
import CheckIcon from '../../../assets/All_Icons/basic/check_main.svg';
import XIcon from '../../../assets/All_Icons/basic/x_grey.svg';

class CommentBox extends React.Component {
  state = {
    comment: ''
  }

  componentDidMount() {
    if (this.props.comment) {
      this.setState({ comment: this.props.comment });
    }
  }

  render() {
    const { comment } = this.state;
    const { 
      styles, 
      onPressCancel,
      onPressSave,
      commentStyleSize
    } = this.props;

    return (
      <View style={commentStyleSize? commentStyleSize : styles.container}>
        <View style={commentStyleSize? commentStyleSize: {}}>
          <TextInput
            multiline={true}
            numberOfLines={3}
            placeholder={"Escribe aquí tus observaciones a este producto..."}
            onChangeText={(comment) => this.setState({ comment })}
            value={comment}
            style={styles.text_input}
          />
        </View>
        <View style={styles.btn_container}>
          <TouchableIcon
            onPress={() => onPressCancel()}
            styles={{ ...styles.btn_area, ...styles.add_marginLeft }}
            icon={<XIcon {...styles.icon} />}
          />
          <TouchableIcon
            styles={styles.btn_area}
            onPress={() => onPressSave(comment)}
            icon={<CheckIcon {...styles.icon} />}
          />
        </View>
      </View>
    );
  }
}

CommentBox.defaultProps = {
  styles
};

CommentBox.propTypes = {
  commentStyleSize: PropTypes.object,
  onPressSave: PropTypes.func.isRequired,
  onPressCancel: PropTypes.func.isRequired,
  comment: PropTypes.string,
  styles: PropTypes.object.isRequired
};

export { CommentBox };