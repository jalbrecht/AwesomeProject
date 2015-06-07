'use strict';

var React = require('react-native');
var { PixelRatio, View, Text, ListView, StyleSheet } = React;

var Engine = require('Main');
var TimerMixin = require('react-timer-mixin');
var TVShowItem = require('../TVShowItem');
var SearchBar = require('../SearchBar');

var Movies = React.createClass({

  mixins: [TimerMixin],

  timeoutID: null,

  getInitialState: function() {
    return {
      filteredDataSource: new ListView.DataSource({rowHasChanged: (row1, row2) => row1.Title != row2.Title && 
                                                                                  row1.Year != row2.Year }),
    };
  },

  componentWillMount: function() {
    this.setState({filteredDataSource: this.state.filteredDataSource.cloneWithRows(this.props.dataSource)});
  },

  getDataSource: function(original) {
      var source = {};
      for (var i = 0; i < original.length; i++) {
           source[original[i].Title] = original[i];
      }; 
      return source;
  },

  render: function() {
    return (
      this.renderListView()
    );
  },

  onSearchChange: function(event) {
    var filter = event.nativeEvent.text.toLowerCase(); 
    this.clearTimeout(this.timeoutID);
    this.timeoutID = this.setTimeout(() => this.searchMovies(filter), 100);
  },

  searchMovies: function(filter) {

    var foundMovies = []    
    if (filter != undefined && filter != "") { 
      var foundItems = Engine.search(this.props.index)(filter);
      for (var i = foundItems.length - 1; i >= 0; i--) {
        foundMovies.push(this.props.dataSource[foundItems[i] - 1]);
      };
    } else foundMovies = this.props.dataSource; 

    var filteredData = this.getDataSource(foundMovies);
    this.setState({
          dataSource: this.props.dataSource,
          filteredDataSource: this.state.filteredDataSource.cloneWithRows(filteredData),
          loaded: this.state.loaded,
        });
  },

  renderListView: function(){
    return(
      <View style={{ flex: 1 }}>
        <SearchBar onSearchChange={this.onSearchChange}
          onFocus={() => this.refs.listview.getScrollResponder().scrollTo(0, 0)} />
        <View style={styles.separator} />
        <ListView
            ref="listview"
            automaticallyAdjustContentInsets={false}
            keyboardDismissMode="onDrag"
            keyboardShouldPersistTaps={true}
            showsVerticalScrollIndicator={false}
            dataSource={this.state.filteredDataSource}
            renderRow={this.renderPostCell}
            style={styles.postsListView}/>
      </View>
      
    );
  },
  renderPostCell: function(post){
    return(
      <TVShowItem post={post} navigator={this.props.navigator} toggleMenuBar={this.props.toggleMenuBar}/>
    );
  }
});

var styles = StyleSheet.create({
  textContainer: {
    flex: 1,
   },
   container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F6F6EF',
  },
  wrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 80
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  postsListView:{
    backgroundColor: 'transparent',
  },
  row: {
    alignItems: 'center',
    backgroundColor: 'white',
    flexDirection: 'row',
    padding: 5,
  },
  thumbnail: {
    width: 53,
    height: 81,
  },
  cellImage: {
    backgroundColor: '#dddddd',
    height: 143,
    marginRight: 10,
    width: 110,
  },
  cellBorder: {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    // Trick to get the thinest line the device can display
    height: 1 / PixelRatio.get(),
    marginLeft: 4,
  },
  movieTitle: {
    flex: 1,
    fontSize: 25,
    fontWeight: '500',
    marginBottom: 2,
  },
  separator: {
    height: 1,
    backgroundColor: '#eeeeee',
  },
});


module.exports = Movies;