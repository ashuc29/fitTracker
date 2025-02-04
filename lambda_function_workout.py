import json
import boto3
from datetime import datetime

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('FitnessTracker')

def lambda_handler(event, context):
    headers = {
        'Access-Control-Allow-Origin': '*',  # Allow all origins
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'OPTIONS,POST'
    }

    try:
        # Check if the event contains the body
        if 'body' not in event:
            return {
                'statusCode': 400,
                'headers': headers,
                'body': json.dumps({'error': 'Request body is missing in the event'})
            }

        body = json.loads(event['body'])
        exercise = body['exercise']
        duration = body['duration']
        calories = body['calories']
        user_id = body['userId']

        timestamp = int(datetime.now().timestamp())

        # Save workout to DynamoDB
        table.put_item(
            Item={
                'userId': user_id,
                'timestamp': timestamp,
                'exercise': exercise,
                'duration': duration,
                'calories': calories
            }
        )

        return {
            'statusCode': 200,
            'headers': headers,
            'body': json.dumps('Workout logged successfully!')
        }

    except Exception as e:
        return {
            'statusCode': 400,
            'headers': headers,
            'body': json.dumps({'error': str(e)})
        }