class AddUsersToRooms < ActiveRecord::Migration[6.0]
  def change
    add_column :rooms, :participants, :integer, array: true, default: []
  end
end
