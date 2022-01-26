public interface ICacheStorage
{
	void Add( string id, byte[] data, string version );
	void Remove( string id );
	byte[] Get( string id );
}
