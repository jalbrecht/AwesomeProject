'use strict';

var React = require('react-native');

var { AsyncStorage, StyleSheet, View, Text, ScrollView, Image } = React;

var window = require('Dimensions').get('window');

var Settings = require('../Settings');

//TODO: Move to common location
var STORAGE_KEY = '@MyMoviesState:key';

var Menu = React.createClass({

  openSettings: function(e) { 
       this.props.nav().popToTop();
       this.props.nav().push({
              title: "Settings",
              component: Settings
          });
  },

  clearCache: function() {
    AsyncStorage.removeItem(STORAGE_KEY)
    .then((_) => console.log("Cleared application cache."))
    .catch((error) => console.log("Failed to clear application cache: " + error))
    .done();
  },

  render: function() {
    return (
      <ScrollView style={styles.menu}>
          <View style={styles.avatarContainer}>
            <Image
              style={styles.avatar}
              source={{
                uri: 'http://pickaface.net/includes/themes/clean/img/slide2.png'
              }}/>
            <Text style={{ position: 'absolute', left: 70, top: 20, color:'white' }}>Edmondo Pentangelo</Text>
          </View>
          <Text style={styles.end}/>
          <Text style={styles.item} onPress={this.openSettings}>Settings</Text>
          <Text style={styles.item}>About</Text>
          <Text style={styles.item}>Contacts</Text>
          <Text style={styles.item}>Credits</Text>
          <Text style={styles.item} onPress={this.clearCache}>Clear Cache</Text>
          <Text style={styles.end}/>
      </ScrollView>
    );
  }
});

var styles = StyleSheet.create({
  menu: {
    flex: 1,
    backgroundColor: '#32394A',
    padding: 0,
    paddingTop: 20,
    width: 1024,
    height: 1024
  },
  avatarContainer: {
    marginBottom: 20,
    marginTop: 20
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    flex: 1
  },
  item: {
    fontSize: 14,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft:10,
    color: 'white',
    borderWidth: 1,
    borderColor: '#252C3B'
  },
  end: {
    borderColor: '#252C3B',
    borderWidth: 0.5,
    height: 0.5
  },
});

module.exports = Menu;