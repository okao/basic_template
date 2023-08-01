# !/usr/bin/env bash

# This script is used to help with sequelize commands

# write a function to create a new model file by taking arguments from the user
function create_model() {
  # ask the user for the model name
  read -p "Enter the model name: " model_name

  # ask the user for the model attributes
  read -p "Enter the model attributes: " model_attributes

  # ask for confirmation before creating the model file
  read -p "Create model $model_name with attributes $model_attributes? (y/n): " confirm

  # if the user confirms, create the model file
  if [[ $confirm == "y" || $confirm == "Y" ]]; then
    echo "Creating model $model_name with attributes $model_attributes..."
    # create the model file
    npx sequelize-cli model:generate --name $model_name --attributes $model_attributes

    # show success message with the model name and attributes
    echo "Model $model_name with attributes $model_attributes created successfully"
  else
    echo "Model not created"
    exit 1
  fi
}

create_model
