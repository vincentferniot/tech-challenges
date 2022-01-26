using UnityEngine;

public class SerializerJson : ISerializer
{
	public string Serialize( object obj )
	{
		string txt = JsonUtility.ToJson( obj );
		return txt;
	}

	public void Deserialize( string txt, object obj )
	{
		JsonUtility.FromJsonOverwrite( txt, obj );
	}
}
