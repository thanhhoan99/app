// import { View, Text, TextInput, TouchableOpacity } from 'react-native';
// import React, { useState, useEffect } from 'react';
// import { Colors } from '@/constants/Colors';
// import { Ionicons } from '@expo/vector-icons';
// import Category from '@/components/Home/Category';
// import { db } from './../../Config/FirebaseConfigs';
// import { collection, getDocs, query, where } from 'firebase/firestore';
// import ExploreBusinessList from './../../components/Explore/ExploreBusinessList';

// export default function Explore() {
//   const [businessList, setBusinessList] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');

//   useEffect(() => {
//     if (searchTerm) {
//       searchBusinessByName(searchTerm);
//     } else {
//       setBusinessList([]); // Clear list if search term is empty
//     }
//   }, [searchTerm]);

//   const getBusinessByCategory = async (category) => {
//     const q = query(collection(db, 'BusinessList'), where('category', '==', category));
//     const querySnapshot = await getDocs(q);
//     setBusinessList([]);
//     querySnapshot.forEach((doc) => {
//       console.log(doc.data());
//       setBusinessList((prev) => [...prev, { id: doc?.id, ...doc.data() }]);
//     });
//   };

//   const searchBusinessByName = async (name) => {
//     const q = query(collection(db, 'BusinessList'), where('name', '==', name));
//     const querySnapshot = await getDocs(q);
//     setBusinessList([]);
//     querySnapshot.forEach((doc) => {
//       console.log(doc.data());
//       setBusinessList((prev) => [...prev, { id: doc?.id, ...doc.data() }]);
//     });
//   };

//   const handleSearchIconPress = () => {
//     if (searchTerm) {
//       searchBusinessByName(searchTerm);
//     }
//   };

//   return (
//     <View style={{ padding: 20 }}>
//       <Text
//         style={{
//           fontFamily: 'outfit-bold',
//           fontSize: 25,
//         }}
//       >
//         Explore More
//       </Text>
//       {/* SearchBar */}
//       <View
//         style={{
//           display: 'flex',
//           flexDirection: 'row',
//           gap: 10,
//           alignItems: 'center',
//           backgroundColor: '#fff',
//           padding: 10,
//           paddingTop: 15,
//           marginVertical: 10,
//           borderRadius: 8,
//           borderWidth: 1,
//           borderColor: Colors.PRIMARY,
//         }}
//       >
//         <TouchableOpacity onPress={handleSearchIconPress}>
//           <Ionicons name="search" size={24} color={Colors.PRIMARY} />
//         </TouchableOpacity>
//         <TextInput
//           placeholder="Search..."
//           value={searchTerm}
//           onChangeText={(text) => setSearchTerm(text)}
//           style={{ flex: 1 }}
//         />
//       </View>
//       {/* SearchBar */}
//       <Category
//         explore={true}
//         onCategorySelect={(category) => getBusinessByCategory(category)}
//       />

//       <ExploreBusinessList businessList={businessList} />
//     </View>
//   );
// }
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Colors } from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import Category from '@/components/Home/Category';
import { db } from './../../Config/FirebaseConfigs';
import { collection, getDocs, query, where } from 'firebase/firestore';
import ExploreBusinessList from './../../components/Explore/ExploreBusinessList';

export default function Explore() {
  const [businessList, setBusinessList] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (searchTerm) {
      searchBusinessByName(searchTerm);
    } else {
      setBusinessList([]); // Clear list if search term is empty
    }
  }, [searchTerm]);

  const getBusinessByCategory = async (category) => {
    const q = query(collection(db, 'BusinessList'), where('category', '==', category));
    const querySnapshot = await getDocs(q);
    setBusinessList([]);
    querySnapshot.forEach((doc) => {
      console.log(doc.data());
      setBusinessList((prev) => [...prev, { id: doc?.id, ...doc.data() }]);
    });
  };

  const searchBusinessByName = async (name) => {
    const q = query(collection(db, 'BusinessList'));
    const querySnapshot = await getDocs(q);
    const filteredBusinesses = [];
    
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      // Filter business names that include the search term
      if (data.name.toLowerCase().includes(name.toLowerCase())) {
        filteredBusinesses.push({ id: doc.id, ...data });
      }
    });
    
    setBusinessList(filteredBusinesses);
  };

  const handleSearchIconPress = () => {
    if (searchTerm) {
      searchBusinessByName(searchTerm);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text
        style={{
          fontFamily: 'outfit-bold',
          fontSize: 25,
        }}
      >
        Explore More
      </Text>
      {/* SearchBar */}
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          gap: 10,
          alignItems: 'center',
          backgroundColor: '#fff',
          padding: 10,
          paddingTop: 15,
          marginVertical: 10,
          borderRadius: 8,
          borderWidth: 1,
          borderColor: Colors.PRIMARY,
        }}
      >
        <TouchableOpacity onPress={handleSearchIconPress}>
          <Ionicons name="search" size={24} color={Colors.PRIMARY} />
        </TouchableOpacity>
        <TextInput
          placeholder="Search..."
          value={searchTerm}
          onChangeText={(text) => setSearchTerm(text)}
          style={{ flex: 1 }}
        />
      </View>
      {/* SearchBar */}
      <Category
        explore={true}
        onCategorySelect={(category) => getBusinessByCategory(category)}
      />

      <ExploreBusinessList businessList={businessList} />
    </View>
  );
}
