json.extract! message, :id, :content, :user, :room_id, :created_at, :updated_at
json.url message_url(message, format: :json)
