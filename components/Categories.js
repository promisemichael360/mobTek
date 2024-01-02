import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'
import { CatApi } from './CategoriesApi'
import Animated,{ FadeInDown } from 'react-native-reanimated';



export default function Categories({activeCat,categories,handleChangeCat}) {
  
  return (
    <Animated.View entering={FadeInDown.duration(500).springify()}>
      <ScrollView horizontal showsScrollHorizontalIndicator={false} className="space-x-4" contentContainerStyle={{paddingHorizontal:15}}>
        {categories.map((cat,index)=>{
            let isActive=cat.strCategory==activeCat
            let activeButton=isActive?"bg-amber-400":"bg-black/10"
            return(
                <TouchableOpacity key={index} className="flex items-center space-y-1" onPress={()=>handleChangeCat(cat.strCategory)}>
                    <View className={`rounded-full p-[6px] ${activeButton}`}>
                        <Image source={{uri:`${cat.strCategoryThumb}`}} style={{height:hp(6),width:hp(6)}} className="rounded-full"/>
                    </View>
                    <Text className="text-neutral-600" style={{fontSize:hp(1.6)}}>{cat.strCategory}</Text>
                </TouchableOpacity>
            )
        })}
      </ScrollView>
    </Animated.View>
  )
}