using System;
using System.Collections.Generic;
using System.IO;
using UnityEngine;

[ Serializable ]
public class FileCacheStorage : ICacheStorage
{
	private const string CURRENT_VERSION = "1.0";
	private const string DATE_FORMAT = "yyMMdd";
	private const float EXPIRING_TIME_DAYS = 60f;

	private readonly string _cachePath;
	private readonly Dictionary<string, FileCacheEntry> _cacheEntryById = new Dictionary<string, FileCacheEntry>();
	private readonly string _fileName;
	private readonly IFileSystem _fileSystem;
	private readonly ISerializer _serializer;

	[ SerializeField ]
	private List<FileCacheEntry> _cacheEntries = new List<FileCacheEntry>();

	[ SerializeField ]
	private string _version;

	[ Serializable ]
	public class FileCacheEntry : CacheEntry<string>
	{
		//FileCacheEntry stores the path of a file which contains the data, and not the data itself
		public FileCacheEntry( string id, string version, string pathData, string lastUseDate ) : base( id, version, pathData, lastUseDate )
		{
		}
	}

	public FileCacheStorage( string path, string fileName, IFileSystem fileSystem, ISerializer serializer )
	{
		if( string.IsNullOrEmpty( path ) )
			throw new NullReferenceException( nameof( path ) );

		if( string.IsNullOrEmpty( fileName ) )
			throw new NullReferenceException( nameof( fileName ) );

		_cachePath = path;
		_fileName = fileName;

		_fileSystem = fileSystem ?? throw new NullReferenceException( nameof( fileSystem ) );
		_serializer = serializer ?? throw new NullReferenceException( nameof( serializer ) );

		InitCache();
	}

	private void InitCache()
	{
		if( !_fileSystem.DirExists( _cachePath ) )
		{
			_fileSystem.CreateDir( _cachePath );
			return;
		}

		if( DeserializeCacheEntries() )
		{
			if( !IsCurrentVersion() )
				DeleteAll();
			else
			    ClearExpiredCacheEntries();
		}
		else
			DeleteAll();
	}

	private bool DeserializeCacheEntries()
	{
		string filePath = _cachePath + "/" + _fileName;

		if( !_fileSystem.FileExists( filePath ) )
			return false;

		try
		{
			LoadCacheEntriesFromFile( filePath );
			return true;
		}
		catch( Exception e )
		{
			Log.LogError( "Could not load cache entries from " + filePath + "!\n" + e.Message + "\n" + e.StackTrace );
		}

		return false;
	}

	private void LoadCacheEntriesFromFile( string path )
	{
		string txt = _fileSystem.ReadText( path, FileMode.Open, FileAccess.Read, FileShare.ReadWrite );
		_serializer.Deserialize( txt, this );
		CopyDeserializedEntriesToDic();
	}

	private void CopyDeserializedEntriesToDic()
	{
		_cacheEntryById.Clear();
		foreach( FileCacheEntry cacheEntry in _cacheEntries )
			_cacheEntryById.Add( cacheEntry.Id, cacheEntry );
	}

	private bool IsCurrentVersion()
	{
		return _version == CURRENT_VERSION;
	}

	private void ClearExpiredCacheEntries()
	{
		List<FileCacheEntry> expiredEntries = GetExpiredCacheEntries();

		foreach( FileCacheEntry t in expiredEntries )
			Remove( t.Id );
	}

	private List<FileCacheEntry> GetExpiredCacheEntries()
	{
		DateTime dateNow = DateTime.Now;
		List<FileCacheEntry> expiredEntries = new List<FileCacheEntry>();

		foreach( KeyValuePair<string, FileCacheEntry> ce in _cacheEntryById )
		{
			DateTime datetime = GetEntryLastUseDate( ce.Value );
			TimeSpan span = dateNow - datetime;

			if( span.TotalDays > EXPIRING_TIME_DAYS )
				expiredEntries.Add( ce.Value );
		}

		return expiredEntries;
	}

	private void UpdateUseDate( string id )
	{
		_cacheEntryById[ id ].LastUseDate = DateTime.Now.ToString( DATE_FORMAT );
	}

	private DateTime GetEntryLastUseDate( FileCacheEntry entry )
	{
		return DateTime.ParseExact( entry.LastUseDate, DATE_FORMAT, null );
	}

	private void SaveFile( string path, byte[] value )
	{
		if( !_fileSystem.DirExists( _cachePath ) )
			_fileSystem.CreateDir( _cachePath );

		_fileSystem.Write( path, value );
	}

	private void DeleteFile( FileCacheEntry ce )
	{
		if( ce.Data == null )
			return;

		string path = ce.Data;

		if( _fileSystem.FileExists( path ) )
			_fileSystem.DeleteFile( path );
	}

	private void DeleteAll()
	{
		_cacheEntryById.Clear();
		_cacheEntries.Clear();
		_fileSystem.DeleteDir( _cachePath );
	}

	private bool Has( string id )
	{
		return _cacheEntryById.ContainsKey( id );
	}

	private bool MatchesVersion( string id, string version )
	{
		return _cacheEntryById[ id ].Version == version;
	}

	public byte[] Get( string id )
	{
		if( !_cacheEntryById.TryGetValue( id, out FileCacheEntry ce ) )
			return null;

		byte[] result = _fileSystem.Read( ce.Data );

		UpdateUseDate( id );

		return result;
	}

	public void Add( string id, byte[] value, string version )
	{
		string path = _cachePath + "/" + id;

		if( !Has( id ) || !_fileSystem.FileExists( path ) || !MatchesVersion( id, version ) )
			SaveFile( path, value );

		_cacheEntryById[ id ] = new FileCacheEntry( id, version, path, DateTime.Now.ToString( DATE_FORMAT ) );
	}

	public void Remove( string id )
	{
		if( !_cacheEntryById.TryGetValue( id, out FileCacheEntry ce ) )
			return;

		try
		{
			DeleteFile( ce );
		}
		catch( Exception )
		{
			Log.LogError( "Fail to delete file : " + ce );
			return;
		}

		_cacheEntryById.Remove( id );
	}
}
