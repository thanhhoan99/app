import { View, Text ,FlatList, ScrollView} from 'react-native'
import React from 'react'
import BusinessListCard from './../../components/Explore/BusinessListCard'
export default function ExploreBusinessList({businessList}) {
  return (
    <ScrollView>
       <FlatList
            data={businessList}
            scrollEnabled
         
            renderItem={({item,index})=>(
                <BusinessListCard business={item} key={index}/>
        )}
    />
        <View style={{height:200}}></View>
    </ScrollView>
  )
}