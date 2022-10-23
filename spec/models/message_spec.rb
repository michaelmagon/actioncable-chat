# == Schema Information
#
# Table name: messages
#
#  id           :bigint           not null, primary key
#  content      :text
#  message_type :string           default("text")
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#  room_id      :bigint           not null
#  user_id      :bigint
#
# Indexes
#
#  index_messages_on_room_id  (room_id)
#  index_messages_on_user_id  (user_id)
#
# Foreign Keys
#
#  fk_rails_...  (room_id => rooms.id)
#
require 'rails_helper'

RSpec.describe Message, type: :model do
  pending "add some examples to (or delete) #{__FILE__}"
end
