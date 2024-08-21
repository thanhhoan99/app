import { View, Text, TouchableOpacity, TextInput, Image, ToastAndroid, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import { Colors } from '@/constants/Colors';
import RNPickerSelect from 'react-native-picker-select';
import { db, storage } from '../../Config/FirebaseConfigs';
import { collection, doc, getDocs, query, setDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { useUser } from '@clerk/clerk-react';

export default function AddBusiness() {
    const navigation = useNavigation();
    const [categoryList, setCategoryList] = useState([]);
    const [image, setImage] = useState(null); // Set default value to null
    const { user } = useUser();
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [contact, setContact] = useState('');
    const [website, setWebsite] = useState('');
    const [about, setAbout] = useState('');
    const [category, setCategory] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        navigation.setOptions({
            headerShown: true,
            headerTitle: 'Add New Business'
        });
        GetCategoryList();
    }, []);

    const onImagePick = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1,
        });
        setImage(result?.assets[0].uri);
        console.log(result);
    }

    const GetCategoryList = async () => {
        setCategoryList([]);
        const q = query(collection(db, 'Category'));
        const snapShot = await getDocs(q);

        snapShot.forEach((doc) => {
            console.log(doc.data());
            setCategoryList(prev => [...prev, {
                label: doc.data().name,
                value: doc.data().name
            }]);
        });
    }

    const onAddNewBusiness = async () => {
        setLoading(true);
        try {
            if (image) {
                const fileName = Date.now().toString() + ".jpg";
                const resp = await fetch(image);
                const blob = await resp.blob();

                const imageRef = ref(storage, '/business-app/' + fileName);
                await uploadBytes(imageRef, blob);
                const downloadUrl = await getDownloadURL(imageRef);

                await saveBusinessDetail(downloadUrl);
            } else {
                await saveBusinessDetail(null); // Handle case where no image is uploaded
            }
            // Clear all fields
            setName('');
            setAddress('');
            setContact('');
            setWebsite('');
            setAbout('');
            setCategory('');
            setImage(null);
            ToastAndroid.show('New Business added...', ToastAndroid.LONG);
        } catch (error) {
            console.error("Error adding business: ", error);
            ToastAndroid.show('Failed to add business', ToastAndroid.LONG);
        } finally {
            setLoading(false);
        }
    }

    const saveBusinessDetail = async (imageUrl) => {
        await setDoc(doc(db, 'BusinessList', Date.now().toString()), {
            name: name,
            address: address,
            contact: contact,
            about: about,
            website: website,
            category: category,
            username: user?.fullName,
            userEmail: user?.primaryEmailAddress?.emailAddress,
            userImage: user?.imageUrl,
            imageUrl: imageUrl
        });
    }

    return (
        <View style={{ padding: 20 }}>
            <Text style={{ fontFamily: 'outfit-bold', fontSize: 25 }}>Add Business</Text>
            <Text style={{ fontFamily: 'outfit', fontSize: 13, color: Colors.GRAY }}>
                Fill all detail in order to add new business
            </Text>
            <TouchableOpacity
                style={{ marginTop: 20 }}
                onPress={() => onImagePick()}
            >
                {!image ? (
                    <Image style={{ width: 100, height: 100, borderRadius: 15 }}
                        source={require('./../../assets/images/camera.png')} />
                ) : (
                    <Image style={{ width: 100, height: 100 }}
                        source={{ uri: image }} />
                )}
            </TouchableOpacity>
            <View>
                <TextInput placeholder='Name'
                    value={name}
                    onChangeText={(v) => setName(v)}
                    style={{
                        fontFamily: 'outfit',
                        fontSize: 17,
                        padding: 10,
                        borderWidth: 1,
                        borderRadius: 5,
                        backgroundColor: '#fff',
                        marginTop: 10,
                        borderColor: Colors.PRIMARY
                    }} />
                <TextInput placeholder='Address'
                    value={address}
                    onChangeText={(v) => setAddress(v)}
                    style={{
                        fontFamily: 'outfit',
                        fontSize: 17,
                        padding: 10,
                        borderWidth: 1,
                        borderRadius: 5,
                        backgroundColor: '#fff',
                        marginTop: 10,
                        borderColor: Colors.PRIMARY
                    }} />
                <TextInput placeholder='Contact'
                    value={contact}
                    onChangeText={(v) => setContact(v)}
                    style={{
                        fontFamily: 'outfit',
                        fontSize: 17,
                        padding: 10,
                        borderWidth: 1,
                        borderRadius: 5,
                        backgroundColor: '#fff',
                        marginTop: 10,
                        borderColor: Colors.PRIMARY
                    }} />
                <TextInput placeholder='Website'
                    value={website}
                    onChangeText={(v) => setWebsite(v)}
                    style={{
                        fontFamily: 'outfit',
                        fontSize: 17,
                        padding: 10,
                        borderWidth: 1,
                        borderRadius: 5,
                        backgroundColor: '#fff',
                        marginTop: 10,
                        borderColor: Colors.PRIMARY
                    }} />
                <TextInput placeholder='About'
                    value={about}
                    onChangeText={(v) => setAbout(v)}
                    multiline
                    numberOfLines={5}
                    style={{
                        fontFamily: 'outfit',
                        fontSize: 17,
                        padding: 10,
                        borderWidth: 1,
                        borderRadius: 5,
                        backgroundColor: '#fff',
                        marginTop: 10,
                        borderColor: Colors.PRIMARY,
                        height: 100
                    }} />
                <View style={{
                    borderWidth: 1,
                    borderRadius: 5,
                    backgroundColor: '#fff',
                    marginTop: 10,
                    borderColor: Colors.PRIMARY,
                }}>
                    <RNPickerSelect
                        onValueChange={(value) => setCategory(value)}
                        items={categoryList}
                        value={category}
                    />
                </View>
            </View>
            <TouchableOpacity
                disabled={loading}
                style={{ marginTop: 20, backgroundColor: Colors.PRIMARY, borderRadius: 5, paddingVertical: 15 }}
                onPress={() => onAddNewBusiness()} >
                {loading ?
                    <ActivityIndicator size={'large'} color={'#fff'} /> :
                    <Text style={{
                        fontFamily: 'outfit-medium',
                        color: '#fff',
                        textAlign: 'center'
                    }}>Add New Business</Text>
                }
            </TouchableOpacity>
        </View>
    );
}


// import { View, Text, TouchableOpacity, TextInput, Image, ToastAndroid, ActivityIndicator } from 'react-native';
// import React, { useEffect, useState } from 'react';
// import { useNavigation } from 'expo-router';
// import * as ImagePicker from 'expo-image-picker';
// import { Colors } from '@/constants/Colors';
// import RNPickerSelect from 'react-native-picker-select';
// import { db, storage } from '../../Config/FirebaseConfigs';
// import { collection, doc, getDocs, query, setDoc } from 'firebase/firestore';
// import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
// import { useUser } from '@clerk/clerk-react';

// export default function AddBusiness() {
//     const navigation = useNavigation();
//     const [categoryList, setCategoryList] = useState([]);
//     const [image, setImage] = useState(false);
//     const { user } = useUser();
//     const [name, setName] = useState('');
//     const [address, setAddress] = useState('');
//     const [contact, setContact] = useState('');
//     const [website, setWebsite] = useState('');
//     const [about, setAbout] = useState('');
//     const [category, setCategory] = useState([]);
//     const [loading, setLoading] = useState(false);
    
//     useEffect(() => {
//         navigation.setOptions({
//             headerShown: true,
//             headerTitle: 'Add New Business'
//         });
//         GetCategoryList();
//     }, []);

//     const onImagePick = async () => {
//         let result = await ImagePicker.launchImageLibraryAsync({
//             mediaTypes: ImagePicker.MediaTypeOptions.Images,
//             allowsEditing: true,
//             quality: 1,
//         });
//         setImage(result?.assets[0].uri);
//         console.log(result);
//     }

//     const GetCategoryList = async () => {
//         setCategoryList([]);
//         const q = query(collection(db, 'Category'));
//         const snapShot = await getDocs(q);

//         snapShot.forEach((doc) => {
//             console.log(doc.data());
//             setCategoryList(prev => [...prev, {
//                 label: (doc.data()).name,
//                 value: (doc.data()).name
//             }]);
//         });
//     }

//     const onAddNeuBusiness = async () => {
//         setLoading(true);
//         const fileName = Date.now().toString() + ".jpg";
//         const resp = await fetch(image);
//         const blob = await resp.blob();

//         const imageRef = ref(storage, '/business-app/' + fileName);
//         uploadBytes(imageRef, blob).then((snapShot) => {
//             console.log("File Uploaded...");
//         }).then(resp => {
//             getDownloadURL(imageRef).then(async (downloadUrl) => {
//                 console.log(downloadUrl);
//                 saveBusinessDetail(downloadUrl);
//             });
//         });
//         setLoading(false);
//     }

//     const saveBusinessDetail = async (imageUrl) => {
//         await setDoc(doc(db, 'BusinessList', Date.now().toString()), {
//             name: name,
//             address: address,
//             contact: contact,
//             about: about,
//             website: website,
//             category: category,
//             username: user?.fullName,
//             userEmail: user?.primaryEmailAddress?.emailAddress,
//             userImage: user?.imageUrl,
//             imageUrl: imageUrl
//         });
//         ToastAndroid.show('New Business added...', ToastAndroid.LONG);
//     }

//     return (
//         <View style={{
//             padding: 20
//         }}>
//             <Text style={{
//                 fontFamily: 'outfit-bold',
//                 fontSize: 25
//             }}>Add Business</Text>
//             <Text style={{
//                 fontFamily: 'outfit',
//                 fontSize: 13,
//                 color: Colors.GRAY
//             }}>Fill all detail in order to add new business</Text>
//             <TouchableOpacity
//                 style={{ marginTop: 20 }}
//                 onPress={() => onImagePick()}
//             >
//                 {!image ? <Image style={{ width: 100, height: 100, borderRadius: 15 }}
//                     source={require('./../../assets/images/camera.png')}
//                 /> :
//                     <Image style={{ width: 100, height: 100 }}
//                         source={{ uri: image }} />
//                 }
//             </TouchableOpacity>
//             <View>
//                 <TextInput placeholder='Name'
//                     onChangeText={(v) => setName(v)}
//                     style={{
//                         fontFamily: 'outfit',
//                         fontSize: 17,
//                         padding: 10,
//                         borderWidth: 1,
//                         borderRadius: 5,
//                         backgroundColor: '#fff',
//                         marginTop: 10,
//                         borderColor: Colors.PRIMARY
//                     }} />
//                 <TextInput placeholder='Address'
//                     onChangeText={(v) => setAddress(v)}
//                     style={{
//                         fontFamily: 'outfit',
//                         fontSize: 17,
//                         padding: 10,
//                         borderWidth: 1,
//                         borderRadius: 5,
//                         backgroundColor: '#fff',
//                         marginTop: 10,
//                         borderColor: Colors.PRIMARY
//                     }} />
//                 <TextInput placeholder='Contact'
//                     onChangeText={(v) => setContact(v)}
//                     style={{
//                         fontFamily: 'outfit',
//                         fontSize: 17,
//                         padding: 10,
//                         borderWidth: 1,
//                         borderRadius: 5,
//                         backgroundColor: '#fff',
//                         marginTop: 10,
//                         borderColor: Colors.PRIMARY
//                     }} />
//                 <TextInput placeholder='Website'
//                     onChangeText={(v) => setWebsite(v)}
//                     style={{
//                         fontFamily: 'outfit',
//                         fontSize: 17,
//                         padding: 10,
//                         borderWidth: 1,
//                         borderRadius: 5,
//                         backgroundColor: '#fff',
//                         marginTop: 10,
//                         borderColor: Colors.PRIMARY
//                     }} />
//                 <TextInput placeholder='About'
//                     onChangeText={(v) => setAbout(v)}
//                     multiline
//                     numberOfLines={5}
//                     style={{
//                         fontFamily: 'outfit',
//                         fontSize: 17,
//                         padding: 10,
//                         borderWidth: 1,
//                         borderRadius: 5,
//                         backgroundColor: '#fff',
//                         marginTop: 10,
//                         borderColor: Colors.PRIMARY,
//                         height: 100
//                     }} />
//                 <View style={{
//                     borderWidth: 1,
//                     borderRadius: 5,
//                     backgroundColor: '#fff',
//                     marginTop: 10,
//                     borderColor: Colors.PRIMARY,
//                 }}>
//                     <RNPickerSelect
//                         onValueChange={(value) => setCategory(value)}
//                         items={categoryList}
//                     />
//                 </View>
//             </View>
//             <TouchableOpacity
//                 disabled={loading}
//                 style={{ marginTop: 20, backgroundColor: Colors.PRIMARY, borderRadius: 5,paddingVertical: 15, marginTop: 20 }}
//                 onPress={() => onAddNeuBusiness()} >
//                 {loading ?
//                     <ActivityIndicator size={'large'} color={'#fff'} /> :
//                     <Text style={{
//                         fontFamily: 'outfit-medium',
//                         color: '#fff',
//                         textAlign: 'center'
//                     }}>Add New Business</Text>
//                 }
//             </TouchableOpacity>
//         </View>
//     );
// }
