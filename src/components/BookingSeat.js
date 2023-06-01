/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import {
    View, Text,
    TouchableOpacity,
    StyleSheet, Image,
    ScrollView, Alert,

} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ionic from 'react-native-vector-icons/Ionicons';
import Material from 'react-native-vector-icons/MaterialCommunityIcons';
import DropDownPicker from 'react-native-dropdown-picker';

const BookingSeat = ({ navigation }) => {
    const [alertCount, setAlertCount] = useState(0);
    const [floorMapdropdown, setFloorMapdropdown] = useState([]);
    const [floorId, setFloorId] = useState('');
    const [floorName, setFloorName] = useState('');
    const [floorImage, setFloorImage] = useState('');
    const [floorWidth, setFloorWidth] = useState(0);
    const [floorHeight, setFloorHeight] = useState(0);
    const [item, setItem] = useState('');
    const [loading, setLoading] = useState(true);
    const [tagsData, setTagsData] = useState([]);
    const [uploadImage, setUploadImage] = useState([]);
    const [message, setMessage] = useState('');

    const changeDropdownImage = (value, id) => {
        setLoading(true);
        setMessage('');
        setTagsData([]);
        setItem('');
        setFloorWidth(0);
        setFloorHeight(0);
        setFloorName('');
        for (let i = 0; i < uploadImage.length; i++) {
            if (uploadImage[i].id == id) {
                setFloorName(uploadImage[i].name);
                setFloorId(uploadImage[i].id);
                setFloorImage(uploadImage[i].image);
                setFloorWidth(parseFloat(uploadImage[i].width));
                setFloorHeight(parseFloat(uploadImage[i].height));
                floorMapTags(
                    uploadImage[i].name,
                    parseFloat(uploadImage[i].width),
                    parseFloat(uploadImage[i].height),
                );
            }
        }
        setLoading(false);
    };

    const floorMap = async () => {
        setLoading(true);
        console.log('<=== ENTER INTO FLOORMAP ===>');
        // const local_token = await AsyncStorage.getItem('@jwt_token');
        // const jsontoken = await JSON.parse(local_token);
        // const token = jsontoken.jwttoken;
        axios
            .get('/api/uploadmap', {
                // headers: { Authorization: `Bearer ${token}` },
            })
            .then(response => {
                if (response.status === 201 || response.status === 200) {
                    console.log('uploadmap==>');
                    let json = response.data;
                    if (json.length > 0) {
                        setUploadImage(json);
                        let drop = [];
                        for (let i = 0; i < json.length; i++) {
                            let dropdownlist = {
                                id: json[i].id,
                                label: json[i].name,
                                value: json[i].name,
                            };
                            drop.push(dropdownlist);
                        }
                        setFloorMapdropdown(drop);
                        setFloorId(json[0].id);
                        setFloorName(json[0].name);
                        setFloorImage(json[0].image);
                        setFloorWidth(json[0].width);
                        setFloorHeight(json[0].height);
                        floorMapTags(
                            json[0].name,
                            parseFloat(json[0].width),
                            parseFloat(json[0].height),
                        );
                    } else {
                        setMessage('Please upload a floormap.');
                    }
                }
                setLoading(false);
            })
            .catch(error => {
                if (error.response.status !== 403) {
                    setMessage(
                        'Request Failed with status code ' + error.response.status,
                    );
                    console.log('ThermalMap Bad Request===>');
                } else {
                    Alert.alert('User Session has timed out', ' Please Login again', [
                        {
                            text: 'OK',
                            onPress: () => logout('session'),
                        },
                    ]);
                }
            });
    };

    const chartsDatas = async (macaddress, floorname) => {
        console.log('<==== ENTER INTO chartsDatas Alert ===>');
        let jsondata = { macaddress: macaddress };
        Alert.alert(
            'MAC ID: ' + macaddress,
            'Click Proceed to visit thermal graph page.',
            [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                },
                {
                    text: 'Proceed',
                    onPress: () =>
                        navigation.navigate('LineCharts', {
                            macaddress: macaddress,
                            //alertCount: alertCount,
                            floorname: floorname,
                        }),
                },
            ],
        );
    };

    const floorMapTags = async (fname, fwidth, fheight) => {
        setLoading(true);
        setItem([]);
        console.log(
            fwidth,
            '<=========>',
            fheight,
            '<==== ENTER INTO floorMapTags ===>',
            fname,
        );
        const local_token = await AsyncStorage.getItem('@jwt_token');
        const jsontoken = await JSON.parse(local_token);
        const token = jsontoken.jwttoken;
        axios({
            method: 'post',
            url: 'http://hcl.vacustech.in/api/temperaturehumidity?floorname=' + fname,
            headers: { Authorization: 'Bearer ' + token },
        })
            .then(response => {
                if (response.status === 201 || response.status === 200) {
                    let json = response.data;
                    if (json.length > 0) {
                        setItem(json);
                        tagsStoring(json, fwidth, fheight);
                    } else {
                        setMessage(
                            'No Asset is turned on, Please check System Health Page.',
                        );
                    }
                }
                setLoading(false);
            })
            .catch(error => {
                if (error.response.status !== 403) {
                    setMessage(
                        'Request Failed with status code ' + error.response.status,
                    );
                    console.log('ThermalMap Bad Request===>');
                } else {
                    Alert.alert('User Session has timed out', ' Please Login again', [
                        {
                            text: 'OK',
                            onPress: () => logout(''),
                        },
                    ]);
                    console.log('ThermalMap error ====>', error);
                }
                setLoading(false);
            });
    };

    const tagsStoring = (item, fwidth, fheight) => {
        setLoading(true);
        if (item.length > 0) {
            let data = [];
            for (let i = 0; i < item.length; i++) {
                let x = item[i].x;
                let y = item[i].y;
                let x1 = item[i].x1;
                let y1 = item[i].y1;

                let onemeter_width = 950 / fwidth; //floorWidth > 0 ? (950 / floorWidth) : 950/120.194;
                let onemeter_height = 370 / fheight; //floorHeight > 0 ? (370 / floorWidth) : 370/47.002;

                let left = x * onemeter_width;
                let top = y * onemeter_height;
                let width = (x1 - x) * onemeter_width;
                let height = (y1 - y) * onemeter_height;

                if (parseInt(item[i].temperature) < 25) {
                    data.push({
                        temperature: item[i].temperature,
                        left: left - 5,
                        top: top,
                        width: width,
                        height: height,
                        color: 'rgba(0,60,255,0.5)',
                        macAddress: item[i].asset.macAddress,
                        floor: item[i].floor,
                    });
                } else if (
                    parseInt(item[i].temperature) >= 25 &&
                    parseInt(item[i].temperature) < 40
                ) {
                    data.push({
                        temperature: item[i].temperature,
                        left: left - 5,
                        top: top,
                        width: width,
                        height: height,
                        color: 'rgba(0,255,0,0.5)',
                        macAddress: item[i].asset.macAddress,
                        floor: item[i].floor,
                    });
                } else if (parseInt(item[i].temperature) >= 40) {
                    data.push({
                        temperature: item[i].temperature,
                        left: left - 5,
                        top: top,
                        width: width,
                        height: height,
                        color: 'rgba(255, 165, 0, 0.5)',
                        macAddress: item[i].asset.macAddress,
                        floor: item[i].floor,
                    });
                }
            }
            setTagsData(data);
        }
        setLoading(false);
    };

    const logout = () => {
        AsyncStorage.setItem('@login_check', 'failed');
        navigation.navigate('login');
    };

    useEffect(() => {
        floorMap();
    }, []);


    return (
        <View style={styles.container}>
            <View style={[styles.headerContainer, styles.elevation]}>
                <View style={{ flex: 1, flexDirection: 'row' }}>
                    <Image style={styles.logo}
                        source={require('../assets/astralogo.png')} />
                    <View style={{ position: 'absolute', right: 0, margin: 'auto' }}>
                        <TouchableOpacity onPress={() => logout()}>
                            <Material name="logout" size={40} color="#ac3939" />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            <View
                style={{
                    margin: 10,
                    marginTop: 0,
                    flexDirection: 'row',
                }}>
                <Text
                    style={{
                        color: '#000',
                        fontSize: 16,
                        marginTop: 5,
                        marginLeft: 5,
                    }}>
                    Floor Name{' '}
                </Text>
                <DropDownPicker
                    items={
                        floorMapdropdown.length === 0
                            ? [
                                {
                                    id: '0',
                                    label: 'select',
                                    value: 'select',
                                },
                            ]
                            : floorMapdropdown
                    }
                    defaultValue={floorName}
                    containerStyle={{ height: 40 }}
                    style={styles.dropdown_style}
                    itemStyle={{
                        justifyContent: 'flex-start',
                        fontSize: 50,
                    }}
                    onChangeItem={item => changeDropdownImage(item.value, item.id)}
                />
            </View>
        </View>
    );
};

export default BookingSeat;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#C6C6C6',
    },
    elevation: {
        elevation: 10,
        shadowColor: '#d4d4d4',
    },
    headerContainer: {
        width: '100%',
        height: 60,
        padding: 10,
        backgroundColor: '#FFF',
    },
    logo: {
        marginLeft: -20,
        marginTop: -7,
        width: 250,
        height: 60,
    },
});
