import { View, Text, Image, FlatList, useWindowDimensions } from 'react-native';
import React, { useEffect, useState, useRef } from 'react';
import { db } from './../../Config/FirebaseConfigs';
import { collection, getDocs, query } from 'firebase/firestore';

export default function Slider() {
    const [sliderList, setSliderList] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const flatListRef = useRef(null);
    const { width } = useWindowDimensions(); // To handle responsive width

    useEffect(() => {
        GetSliderList();
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            if (flatListRef.current) {
                const nextIndex = (currentIndex + 1) % sliderList.length;
                setCurrentIndex(nextIndex);
                flatListRef.current.scrollToIndex({ index: nextIndex, animated: true });
            }
        }, 3000); // Change slide every 3 seconds

        return () => clearInterval(interval); // Clean up the interval on component unmount
    }, [currentIndex, sliderList]);

    const GetSliderList = async () => {
        setSliderList([]);
        const q = query(collection(db, 'Slider'));
        const querySnapshot = await getDocs(q);

        querySnapshot.forEach((doc) => {
            console.log(doc.data());
            setSliderList(prev => [...prev, doc.data()]);
        });
    };

    return (
        <View>
            <Text style={{
                fontFamily: 'outfit-bold',
                fontSize: 20,
                paddingLeft: 20,
                paddingTop: 20,
                marginBottom: 5
            }}>
                #Special for you
            </Text>
{/* 
            <FlatList
                ref={flatListRef}
                data={sliderList}
                horizontal={true}
                style={{ paddingLeft: 20 }}
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <Image
                        source={{ uri: item.imageUrl }}
                        style={{
                            width: width - 40, // Adjust width based on screen size
                            height: 150,
                            borderRadius: 15,
                            marginRight: 15
                        }}
                    />
                )}
                onScrollToIndexFailed={() => {}}
            /> */}
             <FlatList
              ref={flatListRef}
        data={sliderList}
        horizontal={true}
        style={{paddingLeft:20}}
        showsHorizontalScrollIndicator={false}
        renderItem={({item,index})=>(
            <Image source={{uri:item.imageUrl}}
            style={{
                width:300,
                height:150,
                borderRadius:15,
                marginRight:15
            }}
            />
        )}
        onScrollToIndexFailed={() => {}}
    />
        </View>
    );
}






// import { View, Text,Image ,FlatList} from 'react-native'
// import React, { useEffect, useState } from 'react'
// import {db} from './../../Config/FirebaseConfigs'
// import { collection, getDocs, query } from 'firebase/firestore'


// export default function Slider() {

//     const [sliderList,setSliderList]=useState([]);
//     useEffect(()=>{
//         GetSliderList();
//     },[]);

//     const GetSliderList=async()=>{
//         setSliderList([]);
//         const q=query(collection(db,'Slider'));
//         const querySnapshot=await getDocs(q);

//         querySnapshot.forEach((doc)=>{
//             console.log(doc.data());
//             setSliderList(prev=>[...prev,doc.data()])
//         })
//     }
//   return (
//     <View>
//       <Text style={{
//         fontFamily:'outfit-bold',
//         fontSize:20,
//         paddingLeft:20,
//         paddingTop:20,
//         marginBottom:5
//       }}>   #Special for you 
//       </Text>
    
//     <FlatList
//         data={sliderList}
//         horizontal={true}
//         style={{paddingLeft:20}}
//         showsHorizontalScrollIndicator={false}
//         renderItem={({item,index})=>(
//             <Image source={{uri:item.imageUrl}}
//             style={{
//                 width:300,
//                 height:150,
//                 borderRadius:15,
//                 marginRight:15
//             }}
//             />
//         )}
//     />
//     </View>
//   )
// }