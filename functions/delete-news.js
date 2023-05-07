const delCol = require("./models/allnews");

exports.handler = (event, context) => {
  try {
    let delVar = JSON.parse(event.body).categoryName;

    // Perform delete operation using delCol

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Successfully deleted item" })
    };
  } catch (error) {
    console.error("Error deleting item:", error);

    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Unable to delete item" })
    };
  }
}
