class RoomChannel < ApplicationCable::Channel
  def subscribed
    stop_all_streams
    stream_from "room_channel_#{params[:room_id]}"
    stream_from "new_registrations"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
    stop_stream_from  "room_channel_#{params[:room_id]}"
  end
end
