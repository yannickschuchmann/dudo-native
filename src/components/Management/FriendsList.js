import React, { Component } from 'react';
import { Constants } from 'expo';
import { StyleSheet, FlatList, View, ActivityIndicator } from 'react-native';
import { ListItem, SearchBar, CheckBox } from 'react-native-elements';
import _ from 'lodash';


export default class TableList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [{
                "name": "Yannick",
                "player_id": 1,
                "picture": 'https://scontent.fham1-1.fna.fbcdn.net/v/t1.0-1/c0.13.160.160/p160x160/10013506_783540128324222_6920844401721358352_n.jpg?_nc_cat=102&oh=eb030be13293f9de19f31145990f7da0&oe=5C2053F9',
                "selected": false
            },
            {
                "name": "Sergio",
                "player_id": 2,
                "picture": "https://scontent.fham1-1.fna.fbcdn.net/v/t1.0-1/p160x160/26231447_10154919482157587_2724721708290940515_n.jpg?_nc_cat=108&oh=597f636a7738be6d0d25ae1b17b51255&oe=5C1D5FDC",
                "selected": false
            },
            {
                "name": "John",
                "player_id": 3,
                "picture": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/John_Oliver_November_2016.jpg/220px-John_Oliver_November_2016.jpg",
                "selected": false
            },
            {
                "name": "Andrea",
                "player_id": 4,
                "picture": "https://www.wilsoncenter.org/sites/default/files/andrea_tanco_0.jpg",
                "selected": false
            },
            {
                "name": "Timo",
                "player_id": 5,
                "picture": "https://tmssl.akamaized.net/images/portrait/originals/170527-1471002206.jpg",
                "selected": false
            },
            {
                "name": "Janina",
                "player_id": 6,
                "picture": "https://ngin-food.com/wp-content/uploads/45/69/45697527de561eabbe38e8de876547d1.jpg",
                "selected": false
            },
            {
                "name": "José",
                "player_id": 7,
                "picture": 'https://scontent.fham1-1.fna.fbcdn.net/v/t1.0-1/c0.13.160.160/p160x160/10013506_783540128324222_6920844401721358352_n.jpg?_nc_cat=102&oh=eb030be13293f9de19f31145990f7da0&oe=5C2053F9',
                "selected": false
            },
            {
                "name": "Tomás",
                "player_id": 8,
                "picture": "https://scontent.fham1-1.fna.fbcdn.net/v/t1.0-1/p160x160/26231447_10154919482157587_2724721708290940515_n.jpg?_nc_cat=108&oh=597f636a7738be6d0d25ae1b17b51255&oe=5C1D5FDC",
                "selected": false
            },
            {
                "name": "Felipe",
                "player_id": 9,
                "picture": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/John_Oliver_November_2016.jpg/220px-John_Oliver_November_2016.jpg",
                "selected": false
            },
            {
                "name": "Mariela",
                "player_id": 10,
                "picture": "https://www.wilsoncenter.org/sites/default/files/andrea_tanco_0.jpg",
                "selected": false
            },
            {
                "name": "Alejandra",
                "player_id": 11,
                "picture": "https://tmssl.akamaized.net/images/portrait/originals/170527-1471002206.jpg",
                "selected": false
            },
            {
                "name": "Anika",
                "player_id": 12,
                "picture": "https://ngin-food.com/wp-content/uploads/45/69/45697527de561eabbe38e8de876547d1.jpg",
                "selected": false
            },
            {
                "name": "Alfonso",
                "player_id": 13,
                "picture": 'https://scontent.fham1-1.fna.fbcdn.net/v/t1.0-1/c0.13.160.160/p160x160/10013506_783540128324222_6920844401721358352_n.jpg?_nc_cat=102&oh=eb030be13293f9de19f31145990f7da0&oe=5C2053F9',
                "selected": false
            },
            {
                "name": "Sebastian",
                "player_id": 14,
                "picture": "https://scontent.fham1-1.fna.fbcdn.net/v/t1.0-1/p160x160/26231447_10154919482157587_2724721708290940515_n.jpg?_nc_cat=108&oh=597f636a7738be6d0d25ae1b17b51255&oe=5C1D5FDC",
                "selected": false
            },
            {
                "name": "Braulio",
                "player_id": 15,
                "picture": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/John_Oliver_November_2016.jpg/220px-John_Oliver_November_2016.jpg",
                "selected": false
            },
            {
                "name": "Lucía",
                "player_id": 16,
                "picture": "https://www.wilsoncenter.org/sites/default/files/andrea_tanco_0.jpg",
                "selected": false
            },
            {
                "name": "Luis",
                "player_id": 17,
                "picture": "https://tmssl.akamaized.net/images/portrait/originals/170527-1471002206.jpg",
                "selected": false
            },
            {
                "name": "Loreto",
                "player_id": 18,
                "picture": "https://ngin-food.com/wp-content/uploads/45/69/45697527de561eabbe38e8de876547d1.jpg",
                "selected": false
            },
            {
                "name": "Antonio",
                "player_id": 19,
                "picture": 'https://scontent.fham1-1.fna.fbcdn.net/v/t1.0-1/c0.13.160.160/p160x160/10013506_783540128324222_6920844401721358352_n.jpg?_nc_cat=102&oh=eb030be13293f9de19f31145990f7da0&oe=5C2053F9',
                "selected": false
            },
            {
                "name": "Miguel",
                "player_id": 20,
                "picture": "https://scontent.fham1-1.fna.fbcdn.net/v/t1.0-1/p160x160/26231447_10154919482157587_2724721708290940515_n.jpg?_nc_cat=108&oh=597f636a7738be6d0d25ae1b17b51255&oe=5C1D5FDC",
                "selected": false
            },
            {
                "name": "Rolando",
                "player_id": 21,
                "picture": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/John_Oliver_November_2016.jpg/220px-John_Oliver_November_2016.jpg",
                "selected": false
            },
            {
                "name": "Carolina",
                "player_id": 22,
                "picture": "https://www.wilsoncenter.org/sites/default/files/andrea_tanco_0.jpg",
                "selected": false
            },
            {
                "name": "María José",
                "player_id": 23,
                "picture": "https://tmssl.akamaized.net/images/portrait/originals/170527-1471002206.jpg",
                "selected": false
            },
            {
                "name": "Lorena",
                "player_id": 24,
                "picture": "https://ngin-food.com/wp-content/uploads/45/69/45697527de561eabbe38e8de876547d1.jpg",
                "selected": false
            }],
            "searchBar_placeholder": 'Busca en tu Lista de Amigos'
        };
        this.filteredData = [];

    }
    //Managing Search Logic
    //handleSearch = (text) => {
        //const newData = this.filteredData.filter(item => {
            //const itemData = `${item.name.toUpperCase()}`;
            //const textData = text.toUpperCase();
            //return itemData.indexOf(textData) > -1;
        //});
        //this.setState({
            //data: newData
        //});
    //};
    //Managing Selected Switch
    toggleSwitch = (item) => {
        item.selectd ? this.setState({ selected: false}) : this.setState({ selected: true})
   }



    //Rendering all list Components
    renderHeader = () => {
        return <SearchBar
            round
            placeholder={this.state.searchBar_placeholder}
            placeholderTextColor={'#95792A'}
            containerStyle={styles.searchContainer}
            inputContainerStyle={styles.searchInputContainer}
            inputStyle={styles.searchInputText}
            //onChangeText={(text) => this.handleSearch(text)}
            autoCorrect={false}
        />
    };

    renderItem = ({ item }) => (
        <ListItem
            roundAvatar
            title={`${item.name}`}
            titleStyle={styles.tableNameText}
            avatar={{ uri: item.picture }}
            hideChevron={true}
            containerStyle={styles.container}
            switchButton
            switchOnTintColor={'#95792A'}
            onSwitch={(item) => this.toggleSwitch(item)}

        />
    );
    renderSeparator = () => {
        return (
            <View style={styles.itemSeparator}/>
        );
    };
    //Main Render
    render() {
        return (
            <FlatList
                data={this.state.data}
                keyExtractor = {( item ) => item.player_id.toString()}
                ListHeaderComponent={this.renderHeader}
                renderItem={this.renderItem}
                ItemSeparatorComponent={this.renderSeparator}
            />
        );
    };
}

const styles = StyleSheet.create({
    container: {
        borderBottomWidth: 0,
        borderTopWidth: 0,
    },
    searchContainer: {
        backgroundColor: '#95792A'
    },
    searchInputContainer: {

    },
    searchInputText: {
        color: 'black',
        backgroundColor: '#C8B273'
    },
    tableNameText: {
        color: '#c8b273',
        fontFamily: 'MyriadPro-BoldCond',
        fontSize: 25
    },
    itemSeparator: {
        height: 1,
        width: '86%',
        backgroundColor: '#c8b273',
        marginLeft:'14%'
    },
    activityIndicator: {
        paddingVertical: 20,
        borderTopWidth: 1,
        borderTopColor: "#C8B273"
    }
});
