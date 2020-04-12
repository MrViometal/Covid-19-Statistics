import React, { Component } from 'react';
import { Combobox } from 'evergreen-ui';

class DropDownMenu extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { items, select } = this.props;
    return (
      <>
        <Combobox
          openOnFocus
          items={items}
          width={400}
          initialSelectedItem={'WORLD'}
          onChange={(country) => select(country)}
          autocompleteProps={{}}
        />
      </>
    );
  }
}

export default DropDownMenu;
