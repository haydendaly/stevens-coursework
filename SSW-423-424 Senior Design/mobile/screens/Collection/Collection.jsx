import React, { useContext } from "react"
import { View, Text, SectionList, Image } from "react-native"

import { UserContext } from "../../functions/providers/UserContext";
import { ColorContext } from "../../functions/providers/ColorContext";
import { awardsSchemes } from "../../functions/providers/AwardContext";

const Collection = () => {
    const { awards } = useContext(UserContext)
    const { color } = useContext(ColorContext)

    let allAwards = [
        {
            title: "Achieved Awards",
            data: [...awards]
        }
    ]
    let unachievedAwards = []
    const awardIds = awards.map(item => item.id)
    for(let key of Object.keys(awardsSchemes)){
        if(!awardIds.includes(awardsSchemes[key].id)){
            let newAward = { ...awardsSchemes[key] }
            newAward.image = "https://www.pixelscrapper.com/sites/default/files/styles/456_scale/public/s3fs-user-content/asset-image/user-310/node-38578/enchanted-painted-lilypad-asset-illustration-watercolor-green-white.png"
            unachievedAwards.push(newAward)
        }
    }
    allAwards.push({
        title: "Unachieved Awards",
        data: unachievedAwards
    })

    return (
        <View style={{ height: '100%', width: '100%', backgroundColor: color.background }}>
            <SectionList
                sections={allAwards}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={{ width: '95%', height: 70, flexDirection: 'row', justifyContent: 'flex-start' }}>
                        <Image style={{ height: 50, width: 50, marginHorizontal: 20, marginVertical: 10 }} source={{ uri: item.image}} />
                        <Text style={{ marginTop: 23, fontSize: 16, color: color.primaryText, flexWrap: 'wrap', flexShrink: 1}}>{item.description}</Text>
                    </View>
                )}
                renderSectionHeader={({ section: { title } }) => (
                    <Text style={{fontSize: 20, color: color.highlight, marginTop: 10, marginLeft: 10}}> {title} </Text>
                )}
                stickySectionHeadersEnabled={false}
            />
        </View>
    )
}

export default Collection