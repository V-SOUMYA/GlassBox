import pandas as pd
from sklearn.metrics.pairwise import cosine_similarity

# Load dataset
data = pd.read_csv("ratings.csv")

print("Dataset loaded:\n")
print(data.head())

# Create user-movie matrix
user_movie_matrix = data.pivot_table(index='user_id', columns='movie_id', values='rating').fillna(0)

print("\nUser-Movie Matrix:\n")
print(user_movie_matrix)

# Compute similarity between users
similarity = cosine_similarity(user_movie_matrix)

similarity_df = pd.DataFrame(similarity,
                             index=user_movie_matrix.index,
                             columns=user_movie_matrix.index)

print("\nUser Similarity Matrix:\n")
print(similarity_df)


# Function to recommend movies
def recommend_movies(user_id, top_n=2):
    print(f"\nRecommendations for User {user_id}:")

    # Find similar users
    similar_users = similarity_df[user_id].sort_values(ascending=False)
    similar_users = similar_users.drop(user_id)

    most_similar_user = similar_users.index[0]
    print(f"Most similar user: {most_similar_user}")

    # Movies rated by similar user
    similar_user_movies = user_movie_matrix.loc[most_similar_user]

    # Movies already watched by target user
    user_movies = user_movie_matrix.loc[user_id]

    # Recommend unseen movies
    recommendations = similar_user_movies[user_movies == 0].sort_values(ascending=False)

    print("Recommended movie IDs:")
    print(recommendations.head(top_n))


# Test recommendation
recommend_movies(user_id=1)
