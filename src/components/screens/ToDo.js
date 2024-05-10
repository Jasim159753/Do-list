import React from "react";

class ToDo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      input: "",
    };
  }
  renderItems = () => {
    return this.state.items.map((item) => (
      <li key={item.id}>
        {item.title}{" "}
        <button
          className="del"
          onClick={() => {
            this.removeItem(item.id);
          }}
        >
          Delete
        </button>
      </li>
    ));
  };
  componentDidMount() {
    // Load items from localStorage when the component mounts
    const savedItems = localStorage.getItem("todoItems");
    if (savedItems) {
      this.setState({ items: JSON.parse(savedItems) });
    }
  }

  removeItem = (id) => {
    let updatedList = this.state.items.filter((item) => item.id !== id);
    this.setState({ items: updatedList }, () => {
      // Save the updated list to localStorage
      localStorage.setItem("todoItems", JSON.stringify(updatedList));
    });
  };

  updateItem = () => {
    let new_item = {
      id: this.state.items.length,
      title: this.state.input,
    };
    if (this.state.input) {
      this.setState(
        (prevState) => ({
          items: [...prevState.items, new_item],
          input: "",
        }),
        () => {
          // Save the updated list to localStorage
          localStorage.setItem("todoItems", JSON.stringify(this.state.items));
        }
      );
    }
  };

  render() {
    return (
      <>
        <div className="container">
          <h1>My Do List</h1>
          <ul>{this.renderItems()}</ul>
          <input
            placeholder="Add New task"
            value={this.state.input}
            onChange={(e) => this.setState({ input: e.target.value })}
          />
          <button className="add" onClick={this.updateItem}>
            Add
          </button>
        </div>
      </>
    );
  }
}

export default ToDo;
