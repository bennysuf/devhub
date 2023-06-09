Rails.application.routes.draw do
  resources :projects
  resources :developers
  resources :collaborations, only: [:create, :destroy, :index]
  get "/admin", to: "developers#show"
  post "/signup", to: "developers#create"
  post "/login", to: "sessions#create"
  delete "/logout", to: "sessions#destroy"
  get "get-project/:id", to: "projects#show_project"

  # get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }

  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html
  
  # Defines the root path route ("/")
  # root "articles#index"
end
