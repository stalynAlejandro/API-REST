import { StyleSheet } from 'react-native';
import { COLORS, FONTSIZE, TYPOGRAPHY, LAYOUT } from 'constants';

export default StyleSheet.create({
  dialogEditor_container: {
    left: (LAYOUT.WINDOW.width - 294) / 2,
    top: 37,
    width: 294,
    zIndex: 500,
    backgroundColor: COLORS.neutral_min,
    borderRadius: 5,
    padding: 20,
    flexDirection: "column",
  },
  delete_alert_wrapper: {
    ...LAYOUT.defaultAlert,
  },
  delete_alert_text: {
    ...FONTSIZE.secondary_small,
    color: COLORS.main,
    textAlign: 'center'
  },
  dialog_delete_container: {
    left: (LAYOUT.WINDOW.width - 294) / 2,
    top: 150,
    width: 294,
    zIndex: 500,
    ...Platform.select({
      ios: {
        minHeight: 163,
      },
    }),
    backgroundColor: COLORS.neutral_min,
    borderRadius: 5,
    padding: 20,
  },
  label_info: {
    ...FONTSIZE.normal,
    color: COLORS.neutral_super_strong,
    marginTop: 16
  },
  dialog_input: {
    height: 200,
    justifyContent: "flex-start",
    textAlignVertical: 'top',
    marginTop: 28,
    ...Platform.select({
      ios: {
        height: LAYOUT.WINDOW.height > 700 ? 200 : 170,
      },
    }),
  },
  add_sanitary_measure_buttons_container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
    height: 37,
  },
  separator_line: {
    borderBottomColor: COLORS.neutral_medium_strong,
    borderBottomWidth: 1,
    height: 1
  },
  add_sanitary_mesaure_header: {
    color: COLORS.main,
    ...FONTSIZE.secondary_small,
    marginBottom: 28
  },
  add_sanitary_measure_button: {
    flex: 1,
    flexDirection: 'row',
    marginLeft: 80,
    marginTop: 40,
    marginBottom: 40
  },
  edit_areaTwoButtons: {
    height: 30,
    width: 30,
    alignItems: 'center',
    justifyContent: 'center',

  },
  buttons_container: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginLeft: "auto",
    marginRight: 8,
    marginTop: 8
  },
  edit_button: {
    marginLeft: 34
  },
  ko_button: {
    backgroundColor: COLORS.neutral_dark,
    color: COLORS.neutral_strong,
    ...TYPOGRAPHY.openSans,
    ...FONTSIZE.secondary_large,
    width: '45%',
    marginRight:'5%',
    borderRadius: 5,
    height:40,
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({
      ios: {
        height: 30
      },
    }),
  },
  ok_button: {
    backgroundColor: COLORS.main,
    color: COLORS.main,
    ...TYPOGRAPHY.openSans_bold,
    ...FONTSIZE.secondary_large,
    width: '45%',
    marginLeft:'5%',
    height:40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    ...Platform.select({
      ios: {
        height: 30
      },
    }),
  },
  ok_button_disabled: {
    backgroundColor: COLORS.neutral_dark,
    color: COLORS.neutral_strong,
    ...TYPOGRAPHY.openSans_bold,
    ...FONTSIZE.secondary_large,
    width: '45%',
    marginLeft:'5%',
    height:40,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({
      ios: {
        height: 30
      },
    }),
  },
  ok_btn_text: {
    color: COLORS.neutral_min,
    ...FONTSIZE.secondary_large,
    ...TYPOGRAPHY.openSans_bold,
    textAlign: 'center',
    ...Platform.select({
      ios: {
        lineHeight: 22,
      },
    }),
  },
  ok_btn_text_disabled: {
    color: COLORS.neutral_strong,
    ...TYPOGRAPHY.openSans_bold,
    ...FONTSIZE.secondary_large,
    textAlign: 'center',
    ...Platform.select({
      ios: {
        lineHeight: 22,
      },
    }),
  },
  ko_btn_text: {
    color: COLORS.main,
    ...TYPOGRAPHY.openSans,
    ...FONTSIZE.secondary_large,
    textAlign: 'center',
    ...Platform.select({
      ios: {
        lineHeight: 22,
      },
    }),
  },
});
