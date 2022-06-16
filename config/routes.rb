Rails.application.routes.draw do
  devise_for :users, controllers: {
    registrations: 'users/registrations'
  }
  resources :messages
  resources :rooms
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

  root 'rooms#index'
  get '/rooms/:primary/:secondary', to: 'rooms#show'
end
