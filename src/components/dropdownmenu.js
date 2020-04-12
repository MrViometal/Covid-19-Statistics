import React, { Component } from 'react';
import { Combobox } from 'evergreen-ui';

const items = ['Banana', 'Orange', 'Apple', 'Mango'];
class DropDownMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <>
        <Combobox
          openOnFocus
          items={items}
          width={400}
          initialSelectedItem={'Apple'}
          onChange={(selected) => console.log(selected)}
          autocompleteProps={{}}
        />
      </>
    );
  }
}

export default DropDownMenu;
