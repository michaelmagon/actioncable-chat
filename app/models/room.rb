# == Schema Information
#
# Table name: rooms
#
#  id           :bigint           not null, primary key
#  name         :string
#  participants :integer          default([]), is an Array
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#
class Room < ApplicationRecord

  has_many :messages

end
