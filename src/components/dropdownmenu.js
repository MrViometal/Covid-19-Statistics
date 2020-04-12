import React, { Component } from 'react';
import { Combobox } from 'evergreen-ui';

class DropDownMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { items } = this.props;
    return (
      <>
        <Combobox
          openOnFocus
          items={items}
          width={400}
          initialSelectedItem={'WORLD'}
          onChange={(selected) => console.log(selected)}
          autocompleteProps={{}}
        />
      </>
    );
  }
}

export default DropDownMenu;
