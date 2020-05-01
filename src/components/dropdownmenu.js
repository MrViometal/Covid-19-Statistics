import React, { Component } from 'react';
import { Combobox } from 'evergreen-ui';

class DropDownMenu extends Component {

  render() {
    const { items, select } = this.props;
    return (
      <>
        <Combobox
          openOnFocus
          items={items}
          width={300}
          initialSelectedItem={'WORLD'}
          onChange={(country) => select(country)}
          autocompleteProps={{}}
        />
      </>
    );
  }
}

export default DropDownMenu;
