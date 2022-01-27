public interface ICacheStorage
{
	void Add( string id, byte[] data );
	void Remove( string id );
	byte[] Get( string id );
}
