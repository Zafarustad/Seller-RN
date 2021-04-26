import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  PermissionsAndroid,
  Linking,
} from 'react-native';
import * as ImagePicker from 'react-native-image-picker';

let options = {
  mediaType: 'photo',
  includeBase64: true,
  quality: 0.2,
};

const ImagePickerModal = ({modalVisible, setModalVisible, setImage}) => {
  const getCameraPermission = async () => {
    const result = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.CAMERA,
    );
    if (!result) {
      const permissions = await PermissionsAndroid.request(
        'android.permission.CAMERA',
      );
      if (permissions === 'granted') {
        await AsyncStorage.setItem('camera_permission', 'granted');
        openCamera();
      } else {
        Alert.alert(
          'Permission Denied!',
          'You have to grant permissions from app settings to be able to' +
            ' ' +
            'take pictures from your camera',
          [
            {text: 'Cancel', onPress: () => null},
            {text: 'Open settings', onPress: () => Linking.openSettings()},
          ],
        );
      }
    } else {
      await AsyncStorage.setItem('camera_permission', 'granted');
      openCamera();
    }
  };

  const getStoragePermissions = async () => {
    const result = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE &&
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
    );
    if (!result) {
      const permissions = await PermissionsAndroid.requestMultiple([
        'android.permission.READ_EXTERNAL_STORAGE',
        'android.permission.WRITE_EXTERNAL_STORAGE',
      ]);
      if (
        permissions['android.permission.READ_EXTERNAL_STORAGE'] === 'granted' &&
        permissions['android.permission.WRITE_EXTERNAL_STORAGE'] === 'granted'
      ) {
        await AsyncStorage.setItem('storage_permission', 'granted');
        openLibrary();
      } else {
        Alert.alert(
          'Permission Denied!',
          'You have to grant permissions from app settings to be able to' +
            ' ' +
            'upload documents from your library',
          [
            {
              text: 'Cancel',
              onPress: () => null,
            },
            {text: 'Open settings', onPress: () => Linking.openSettings()},
          ],
        );
      }
    } else {
      await AsyncStorage.setItem('storage_permission', 'granted');
      openLibrary();
    }
  };

  const openCamera = () => {
    ImagePicker.launchCamera(options, (response) => {
      if (!response.didCancel && !response.errorMessage) {
        setModalVisible(false);
        setImage(response.base64);
      }
    });
  };

  const openLibrary = () => {
    ImagePicker.launchImageLibrary(options, (response) => {
      if (!response.didCancel && !response.errorMessage) {
        setModalVisible(false);
        setImage(response.base64);
      }
    });
  };

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            backgroundColor: 'rgba(0,0,0, 0.3)',
          }}>
          <View style={styles.modalView}>
            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.option}
              onPress={async () => {
                const res = await AsyncStorage.getItem('camera_permission');
                if (!res) {
                  getCameraPermission();
                } else {
                  openCamera();
                }
              }}>
              <Text style={styles.textStyle}>Open Camera</Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.option}
              onPress={async () => {
                const res = await AsyncStorage.getItem('storage_permission');
                if (!res) {
                  getStoragePermissions();
                } else {
                  openLibrary();
                }
              }}>
              <Text style={styles.textStyle}>Open Library</Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => setModalVisible(false)}
              style={{alignSelf: 'flex-end', marginRight: 25}}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ImagePickerModal;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    paddingVertical: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  option: {
    width: '90%',
    alignSelf: 'center',
    borderBottomWidth: 0.4,
    borderBottomColor: '#AAA',
  },
  textStyle: {
    fontSize: 18,
    marginVertical: 15,
    marginLeft: 20,
  },
  cancelText: {
    color: 'red',
    fontSize: 18,
    marginLeft: 30,
    marginTop: 20,
  },
});
