defmodule SpaceApi.Repo do
  use Ecto.Repo,
    otp_app: :space_api,
    adapter: Ecto.Adapters.Postgres
end
