// import { View, Text, TextInput, TouchableOpacity, ToastAndroid,Image } from 'react-native'
// import React, { useState } from 'react'
// import { Colors } from '@/constants/Colors'
// import { Rating } from 'react-native-ratings'
// import { db } from './../../Config/FirebaseConfigs'
// import { arrayUnion, doc, getDoc, query, updateDoc } from 'firebase/firestore'
// import { useUser } from '@clerk/clerk-expo'

// export default function Reviews({ business }) {

//     const [rating, setRating] = useState(4);
//     const [userInput, setUserInput] = useState();
//     const { user } = useUser();

//     const onSubmit = async () => {
//         const docRef = doc(db, 'BusinessList', business?.id);
//         await updateDoc(docRef, {
//             reviews: arrayUnion({
//                 rating: rating,
//                 comment: userInput,
//                 userName: user?.fullName,
//                 userImage: user?.imageUrl,
//                 userEmail: user?.primaryEmailAddress?.emailAddress
//             })
//         })
//         ToastAndroid.show('Comment Add Successfully', ToastAndroid.BOTTOM)
//     }
//     console.log('Reviews Component:', business?.reviews);
//     return (
//         <View style={{
//             padding: 20,
//             backgroundColor: '#fff',
//         }}>
//             <Text style={{
//                 fontFamily: 'outfit-bold',
//                 fontSize: 20
//             }}>Reviews</Text>
//             <View>
//                 <Rating
//                     showRating={false}
//                     imageSize={20}
//                     onFinishRating={(rating) => setRating(rating)}
//                     style={{ paddingVertical: 10 }}
//                 />
//                 <TextInput
//                     placeholder='Write your comment'
//                     numberOfLines={4}
//                     onChangeText={(value) => setUserInput(value)}
//                     style={{
//                         borderWidth: 1,
//                         padding: 10,
//                         borderRadius: 10,
//                         borderColor: Colors.GRAY,
//                         textAlignVertical: 'top'

//                     }}
//                 />
//                 <TouchableOpacity
//                     disabled={!userInput}
//                     onPress={() => onSubmit()}
//                     style={{
//                         padding: 10,
//                         backgroundColor: Colors.PRIMARY,
//                         borderRadius: 6, marginTop: 10
//                     }}>
//                     <Text style={{
//                         fontFamily: 'outfit',
//                         color: '#fff',
//                         textAlign: 'center'
//                     }}>Submit</Text>
//                 </TouchableOpacity>

//             </View>
//             <View>
//                 {business?.reviews?.map((item, index) => (
//                     <View style={{
//                         display: 'flex', flexDirection: 'row',
//                         gap: 10, alignItems: 'center',
//                         padding:10,borderWidth:1,
//                         borderColor:Colors.GRAY,
//                         borderRadius:15,marginTop:10
//                     }}>
//                         <Image source={{ uri: item.userImage }}
//                             style={{
//                                 width: 50,
//                                 height: 50, borderRadius: 99
//                             }}
//                         />
//                         <View style={{ display: 'flex', gap: 5 }}>
//                             <Text style={{
//                                 fontFamily: 'outfit-medium',

//                             }}>{item.userName}</Text>
//                             <Rating
//                                 imageSize={20}
//                                 ratingCount={item.rating}
//                                 style={{ alignItems: 'flex-start' }}
//                             />
//                             <Text>{item.comment}</Text>
//                         </View>
//                     </View>
//                 ))}
//             </View>
//         </View>
//     )
// }
import { View, Text, TextInput, TouchableOpacity, ToastAndroid, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Colors } from '@/constants/Colors';
import { Rating } from 'react-native-ratings';
import { db } from './../../Config/FirebaseConfigs';
import { arrayUnion, doc, getDoc, updateDoc } from 'firebase/firestore';
import { useUser } from '@clerk/clerk-expo';

export default function Reviews({ business }) {

    const [rating, setRating] = useState(4);
    const [userInput, setUserInput] = useState('');
    const { user } = useUser();
    const [reviews, setReviews] = useState(business?.reviews || []);

    // Hàm lấy dữ liệu cập nhật từ Firestore
    const fetchUpdatedReviews = async () => {
        const docRef = doc(db, 'BusinessList', business?.id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const updatedBusiness = docSnap.data();
            setReviews(updatedBusiness?.reviews || []);
        }
    }

    const onSubmit = async () => {
        const docRef = doc(db, 'BusinessList', business?.id);
        await updateDoc(docRef, {
            reviews: arrayUnion({
                rating: rating,
                comment: userInput,
                userName: user?.fullName,
                userImage: user?.imageUrl,
                userEmail: user?.primaryEmailAddress?.emailAddress
            })
        });

        ToastAndroid.show('Comment Add Successfully', ToastAndroid.BOTTOM);
        setUserInput(''); // Clear the input field after submission
        fetchUpdatedReviews(); // Load lại dữ liệu sau khi submit
    };

    return (
        <View style={{
            padding: 20,
            backgroundColor: '#fff',
        }}>
            <Text style={{
                fontFamily: 'outfit-bold',
                fontSize: 20
            }}>Reviews</Text>
            <View>
                <Rating
                    showRating={false}
                    imageSize={20}
                    onFinishRating={(rating) => setRating(rating)}
                    style={{ paddingVertical: 10 }}
                />
                <TextInput
                    placeholder='Write your comment'
                    numberOfLines={4}
                    value={userInput}
                    onChangeText={(value) => setUserInput(value)}
                    style={{
                        borderWidth: 1,
                        padding: 10,
                        borderRadius: 10,
                        borderColor: Colors.GRAY,
                        textAlignVertical: 'top'
                    }}
                />
                <TouchableOpacity
                    disabled={!userInput}
                    onPress={() => onSubmit()}
                    style={{
                        padding: 10,
                        backgroundColor: Colors.PRIMARY,
                        borderRadius: 6, marginTop: 10
                    }}>
                    <Text style={{
                        fontFamily: 'outfit',
                        color: '#fff',
                        textAlign: 'center'
                    }}>Submit</Text>
                </TouchableOpacity>

            </View>
            <View>
                {reviews.map((item, index) => (
                    <View key={index} style={{
                        display: 'flex', flexDirection: 'row',
                        gap: 10, alignItems: 'center',
                        padding: 10, borderWidth: 1,
                        borderColor: Colors.GRAY,
                        borderRadius: 15, marginTop: 10
                    }}>
                        <Image source={{ uri: item.userImage }}
                            style={{
                                width: 50,
                                height: 50, borderRadius: 99
                            }}
                        />
                        <View style={{ display: 'flex', gap: 5 }}>
                            <Text style={{
                                fontFamily: 'outfit-medium',
                            }}>{item.userName}</Text>
                            <Rating
                                imageSize={20}
                                startingValue={item.rating}
                                readonly
                                style={{ alignItems: 'flex-start' }}
                            />
                            <Text>{item.comment}</Text>
                        </View>
                    </View>
                ))}
            </View>
        </View>
    );
}
