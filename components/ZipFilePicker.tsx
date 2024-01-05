import {StackNavigationProp} from '@react-navigation/stack';
import React, {useState} from 'react';
import {View, Button, Alert, ActivityIndicator, Modal, Text, StyleSheet, Image} from 'react-native';
import DocumentPicker, {types} from 'react-native-document-picker';
import RNFS, {readFile} from 'react-native-fs';

import {
  extractZipFile,
  jsonUserDataParser,
} from '../services/ZipPicker.service';


export const targetPath = `${RNFS.DownloadDirectoryPath}/instaUnfollower`;
const filesAbsPath = targetPath + '/connections/followers_and_following/';
type ZipFileProps = {
  navigation: StackNavigationProp<any, 'Home'>;
};
const ZipFilePicker = (props: ZipFileProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  
  const onPressHandler = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [types.zip],
      });
      setIsLoading(true);

      await extractZipFile({
        sourcePath: res[0].uri,
        name:
          res[0].name != null
            ? res[0].name
            : `${Math.floor(Math.random() * 1000000)}`,
      });

      const followers = await readFile(
        filesAbsPath + 'followers_1.json',
        'utf8',
      ).catch(err => {
        setIsLoading(false);
        Alert.alert(err);
      });

      const following = await readFile(filesAbsPath + 'following.json').catch(
        err => {
          setIsLoading(false);
          Alert.alert(err);
        },
      );

      if (typeof following !== 'string' || typeof followers !== 'string') {
        setIsLoading(false);
        return Alert.alert('Error something is wrong');
      }

      const parsedJsonFollowingUserData = jsonUserDataParser({
        type: 'Following',
        content: following,
      });

      const parsedJsonFollowersUserData = jsonUserDataParser({
        type: 'Followers',
        content: followers,
      });
      setIsLoading(false);
      if (
        parsedJsonFollowersUserData != null &&
        parsedJsonFollowingUserData != null
      ) {
        props.navigation.navigate('FollowersInfo', {
          followersParsedJsonData: parsedJsonFollowersUserData.data,
          followingParsedJsonData: parsedJsonFollowingUserData.data,
        });
      }
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        setIsLoading(false);
        // User cancelled the picker
      } else {
        throw err;
      }
    }
  };

  return (
    <View>
      <Modal
    animationType="fade"
    transparent={true}
    visible={modalVisible}
    onRequestClose={() => {
      setModalVisible(!modalVisible);
    }}>
    <View style={styles.modalContainer}>
      <View style={styles.innerContainer}>
        <Text>Hello World!</Text>
        <Button
          onPress={() => {
            setModalVisible(!modalVisible);
          }}
          title='close'/>
      </View>
    </View>
  </Modal>

     
      <View style={{
        marginBottom:12
      }}>
      <Button title="Pick ZIP File" onPress={onPressHandler} />
      </View>
      <View>
      <Button
       onPress={() => {
         setModalVisible(true);
       }}
       title="How to use"
       color="grey"
     />
      </View>
      {isLoading === true && (
        <View>
          <ActivityIndicator size={52} />
        </View>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  innerContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
  closeButton: {
    alignSelf: 'center',
    marginTop: 20,
  },
 });
export default ZipFilePicker;
