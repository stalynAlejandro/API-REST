namespace KeTePongo.Core.Interfaces
{
    public interface IChangeVersion
    {
        int ChangeVersion { get; set; }
    }

    public interface INullableChangeVersion
    {
        int? ChangeVersion { get; set; }
    }
}
